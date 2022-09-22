# Install dependencies only when needed
FROM node:18-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN yarn global add pnpm && pnpm i


# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build && \
    yarn global add pnpm && \
    pnpm prune --prod

FROM gcr.io/distroless/nodejs:18 AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder --chown=web:web /app/dist /app
COPY --from=builder --chown=web:web /app/package.json /app
COPY --from=builder --chown=web:web /app/node_modules /app/node_modules

EXPOSE 3000

ENV PORT 3000

CMD ["index.js"]