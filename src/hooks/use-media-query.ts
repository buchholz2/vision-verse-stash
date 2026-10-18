import { useCallback, useMemo, useSyncExternalStore } from "react";

/** Assina a mesma MediaQueryList até a consulta mudar, inclusive durante a reprodução da cena. */
export function useMediaQuery(query: string): boolean {
  const list = useMemo(() => typeof window === "undefined" ? null : window.matchMedia(query), [query]);
  const subscribe = useCallback((notify: () => void) => {
    list?.addEventListener("change", notify);
    return () => list?.removeEventListener("change", notify);
  }, [list]);
  const getSnapshot = useCallback(() => list?.matches ?? false, [list]);
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
