# Используем официальный образ Node.js на Alpine
FROM node:18-alpine AS base
WORKDIR /app

# Установка зависимостей
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Сборка проекта
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Запуск контейнера с Next.js в production-режиме
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

# Копируем необходимые файлы
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Добавьте эту строку перед CMD
ENV PORT=3030

# И измените CMD на
CMD ["npm", "run", "start", "--", "-p", "3030"]


# Docker compose
#    location /admin {
#            rewrite ^/admin(/?)(.*) /$2 break;
#            proxy_pass http://frontend_admin;
#
#            proxy_set_header Host $host;
#            proxy_set_header X-Real-IP $remote_addr;
#            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#            proxy_set_header X-Forwarded-Proto $scheme;
#
#            proxy_connect_timeout 60;
#            proxy_send_timeout 60;
#            proxy_read_timeout 60;
#        }
#
#        location /_next/ {
#            proxy_pass http://frontend_admin;
#            proxy_set_header Host $host;
#            proxy_set_header X-Real-IP $remote_addr;
#        }
