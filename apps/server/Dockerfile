#Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/server/package.json ./apps/server/

RUN npm install

COPY apps/server/ ./apps/server/

WORKDIR /app/apps/server
RUN npm run build

#Stage 2: Run
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/package.json ./
COPY --from=builder /app/package-lock.json ./

RUN npm install --omit-dev

EXPOSE 3001
CMD ["node", "dist/index.js"]