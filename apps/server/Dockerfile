#Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json ./
COPY packages/shared ./packages/shared
COPY apps/server ./apps/server/

RUN npm install
RUN npm run build -w packages/shared
RUN npm run build -w apps/server

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3001
CMD ["node", "dist/index.js"]