###################################################################
# Stage 1: Create base image                                      #
# ----------------------------------------------------------------#
# Notes:                                                          #
#   1. depend on .dockerignore, you must at least                 #
#      ignore: all **/node_modules folders, ...                   #
###################################################################
FROM node:16-alpine AS base
RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm i -g pnpm@8.5.1 turbo@1.10.3

###################################################################
# Stage 2: Create pruned version of locaze/server app             #
#                                                                 #
###################################################################
FROM base AS turbo-prune-server
WORKDIR /app
COPY . .
RUN turbo prune --scope="@locaze/server" --docker

FROM base AS turbo-prune-web
WORKDIR /app
COPY . .
RUN turbo prune --scope="@locaze/web" --docker


###################################################################
# Stage 3: Install and build the apps                             #
###################################################################
FROM base AS server-builder
WORKDIR /app
# First install the dependencies (as they change less often)
# COPY .gitignore .gitignore
COPY --from=turbo-prune-server /app/out/json/ .
COPY --from=turbo-prune-server /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/root/.pnpm-store/v3 pnpm install --frozen-lockfile --ignore-scripts
# Build the project
COPY --from=turbo-prune-server /app/out/full/ .

RUN turbo build --filter=@locaze/server

ENV NODE_ENV=production
RUN pnpm --filter=@locaze/server --prod deploy pruned --ignore-scripts

# https://github.com/kelektiv/node.bcrypt.js/issues/800
RUN cd pruned && npm rebuild bcrypt

FROM base AS web-builder
WORKDIR /app
# First install the dependencies (as they change less often)
# COPY .gitignore .gitignore
COPY --from=turbo-prune-web /app/out/json/ .
COPY --from=turbo-prune-web /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/root/.pnpm-store/v3 pnpm install --frozen-lockfile --ignore-scripts
# Build the project
COPY --from=turbo-prune-web /app/out/full/ .
# ENTRYPOINT ["tail", "-f", "/dev/null"]

ENV NODE_ENV=production
RUN turbo build --filter=@locaze/web

###################################################################
# Stage 4: Extract a minimal image from the build                 #
###################################################################
FROM node:16-alpine AS runner
WORKDIR /app

COPY --from=server-builder /app/pruned/node_modules ./node_modules
COPY --from=server-builder /app/pruned/dist ./dist
COPY --from=web-builder /app/apps/web/dist ./html
# COPY ./apps/server/.env.development .env
EXPOSE 3000

# ENTRYPOINT ["tail", "-f", "/dev/null"]
CMD [ "node","dist/main.js" ]
