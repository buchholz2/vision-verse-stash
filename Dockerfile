# Estágio de Build
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio de Produção (Nginx)
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Se você usa React Router, esta linha é importante para o Nginx:
RUN sed -i 's/index  index.html index.htm;/index  index.html index.htm; try_files $uri $uri\/ \/index.html;/' /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
