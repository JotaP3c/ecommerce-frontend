# ===== build =====
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# se o projeto tem "ng": use npx
RUN npx ng build --configuration=production

EXPOSE 80
