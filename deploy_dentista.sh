#!/usr/bin/env bash
# Deploy seguro do site Dentista Gabriel
# 1. Confere o projeto e baixa a versao nova do GitHub (sem commit, sem push)
# 2. Build da imagem Docker
# 3. Trivy bloqueante (CRITICAL com correcao disponivel)
# 4. Envia imagem e compose para a VPS e sobe o container
# 5. Health check opcional
set -Eeuo pipefail
IFS=$'\n\t'
umask 077

# ---------------- Configuracao ----------------
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

BRANCH="main"
IMAGE="site-dentista-gabriel-web:latest"   # igual ao "image:" do docker-compose.yml
LOGFILE="$PROJECT_DIR/deploy_gabriel.log"
LOCK_FILE="/tmp/deploy_gabriel.lock"

VPS_USER="deployer"
VPS_HOST="10.0.50.1"
REMOTE_DIR="/opt/site-dentista-gabriel"
SSH_KEY="$HOME/.ssh/id_rsa_oracle"
KNOWN_HOSTS="$HOME/.ssh/known_hosts"

TRIVY_IMAGE="aquasec/trivy:0.76.1"        # versao fixa
HEALTHCHECK_URL="${HEALTHCHECK_URL:-}"    # ex.: https://dentistagabrielrockenbach.com.br

SSH_OPTS=(-i "$SSH_KEY" -o IdentitiesOnly=yes -o BatchMode=yes
          -o StrictHostKeyChecking=yes -o UserKnownHostsFile="$KNOWN_HOSTS")
SSH_CMD=(ssh "${SSH_OPTS[@]}" "${VPS_USER}@${VPS_HOST}")
SCP_CMD=(scp "${SSH_OPTS[@]}")

TAR_FILE="$(mktemp /tmp/dentista-images.XXXXXX.tar)"

# ---------------- Funcoes ----------------
log() { echo "$(date '+%Y-%m-%d %H:%M:%S') - $*" | tee -a "$LOGFILE"; }
die() { log "ERRO: $*"; exit 1; }

on_exit() {
  local rc=$?
  rm -f "$TAR_FILE"
  if [[ $rc -ne 0 ]]; then log "Deploy abortado (codigo $rc)."; fi
}
trap on_exit EXIT

# ---------------- Pre-checagens ----------------
[[ $EUID -ne 0 ]] || die "Nao execute com sudo. Rode como usuario normal (daniel)."
id -nG | grep -qw docker || die "Usuario atual nao esta no grupo docker."

for cmd in git docker ssh scp flock curl; do
  command -v "$cmd" >/dev/null || die "Comando nao encontrado: $cmd"
done

[[ -f docker-compose.yml ]] || die "docker-compose.yml nao encontrado."
[[ -f Dockerfile ]] || die "Dockerfile nao encontrado."
[[ -f "$SSH_KEY" ]] || die "Chave SSH nao encontrada: $SSH_KEY"

KEY_PERM="$(stat -c '%a' "$SSH_KEY")"
[[ "$KEY_PERM" == "600" || "$KEY_PERM" == "400" ]] || die "Permissao da chave SSH inadequada ($KEY_PERM). Use chmod 600."

[[ -f "$KNOWN_HOSTS" ]] || die "known_hosts nao encontrado. Conecte uma vez manualmente na VPS."
ssh-keygen -F "$VPS_HOST" -f "$KNOWN_HOSTS" >/dev/null || die "VPS $VPS_HOST nao esta no known_hosts."

[[ "$(git branch --show-current)" == "$BRANCH" ]] || die "Voce nao esta na branch $BRANCH."

exec 9>"$LOCK_FILE"
flock -n 9 || die "Outro deploy ja esta em execucao."

log "Iniciando deploy do Dentista Gabriel."

# ---------------- 1. GitHub (sem commit e sem push) ----------------
log "Verificando mudancas no GitHub..."
git fetch --quiet origin "$BRANCH"

#if [[ -n "$(git status --porcelain)" ]]; then
if [[ -n "$(git status --porcelain --untracked-files=no -- . ':!deploy_dentista.sh')" ]]; then
  git status --short | tee -a "$LOGFILE"
  die "Ha alteracoes locais nao commitadas. Nada foi enviado. Resolva antes do deploy."
fi

LOCAL="$(git rev-parse HEAD)"
REMOTE="$(git rev-parse "origin/$BRANCH")"

if [[ "$LOCAL" == "$REMOTE" ]]; then
  log "Projeto ja esta na versao mais recente do GitHub."
elif git merge-base --is-ancestor "$LOCAL" "$REMOTE"; then
  log "Baixando versao nova do GitHub..."
  git merge --ff-only "origin/$BRANCH"
  log "Projeto atualizado para $(git rev-parse --short HEAD)."
else
  die "Seu historico local divergiu do GitHub (tem commits que nao estao la). Nada foi feito."
fi

# ---------------- 2. Build ----------------
log "Build da imagem (--no-cache --pull)..."
docker compose build --no-cache --pull
docker image inspect "$IMAGE" >/dev/null 2>&1 || die "Imagem $IMAGE nao foi gerada."
log "Build concluido."

# ---------------- 3. Trivy (bloqueante) ----------------
log "Varredura de seguranca com Trivy (CRITICAL com correcao)..."
if docker run --rm \
     -v /var/run/docker.sock:/var/run/docker.sock \
     "$TRIVY_IMAGE" image \
     --severity CRITICAL --ignore-unfixed --skip-version-check \
     --exit-code 1 "$IMAGE"; then
  log "Trivy: nenhuma vulnerabilidade critica corrigivel."
else
  die "Trivy encontrou vulnerabilidades criticas. Atualize a imagem base e tente de novo."
fi

# ---------------- 4. Exportar imagem ----------------
log "Exportando imagem..."
docker save -o "$TAR_FILE" "$IMAGE"
chmod 600 "$TAR_FILE"

# ---------------- 5. Enviar para a VPS ----------------
log "Verificando pasta de destino na VPS..."
"${SSH_CMD[@]}" "test -d '$REMOTE_DIR' && test -w '$REMOTE_DIR'" \
  || die "Pasta $REMOTE_DIR nao existe ou sem permissao para $VPS_USER. Crie-a manualmente (ver instrucoes)."

log "Enviando arquivos (sem .env, o site nao usa segredos)..."
"${SCP_CMD[@]}" docker-compose.yml "${VPS_USER}@${VPS_HOST}:${REMOTE_DIR}/"
"${SCP_CMD[@]}" "$TAR_FILE" "${VPS_USER}@${VPS_HOST}:${REMOTE_DIR}/website_images.tar"

# ---------------- 6. Deploy remoto ----------------
log "Subindo container na VPS..."
"${SSH_CMD[@]}" bash -s -- "$REMOTE_DIR" "$IMAGE" <<'REMOTE'
set -Eeuo pipefail
cd "$1"
trap 'rm -f "$PWD/website_images.tar"' EXIT
docker load -i website_images.tar
docker image inspect "$2" >/dev/null
docker compose up -d --force-recreate --remove-orphans
docker image prune -f >/dev/null
docker compose ps
REMOTE

log "Deploy remoto concluido."

# ---------------- 7. Health check (opcional) ----------------
if [[ -n "$HEALTHCHECK_URL" ]]; then
  log "Health check em $HEALTHCHECK_URL ..."
  for _ in 1 2 3 4 5; do
    if curl -fsS -o /dev/null --max-time 10 "$HEALTHCHECK_URL"; then
      log "Site respondeu OK."
      break
    fi
    sleep 3
    [[ "$_" != 5 ]] || die "Site nao respondeu apos o deploy. Verifique os logs na VPS."
  done
fi

log "Pipeline do Dentista Gabriel concluida com sucesso."
