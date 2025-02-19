FROM node:18-alpine AS base

# Stage 1: Dependencies installation
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# Install exact versions of dependencies (ci = clean install)
RUN npm ci

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN mkdir -p public
RUN npm run build

# Stage 3: Production runtime
FROM base AS runner
WORKDIR /app
# Set production environment
ENV NODE_ENV production

# Copy only necessary files from build stage
# Copy public assets directory
COPY --from=builder /app/public ./public
# Copy standalone Next.js build (optimized for production)
COPY --from=builder /app/.next/standalone ./
# Copy static files needed by Next.js
COPY --from=builder /app/.next/static ./.next/static

# Expose the port the app will run on
EXPOSE 3000
# Configure the application port
ENV PORT 3000
# Configure the application to listen on all network interfaces
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]