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
