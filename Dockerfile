###################################################################
# Stage 1: Create base image                                      #
# ----------------------------------------------------------------#
# Notes:                                                          #
#   1. depend on .dockerignore, you must at least                 #
#      ignore: all **/node_modules folders, ...                   #
###################################################################
FROM node:16-buster-slim AS base
RUN apt-get update && \
    apt-get --yes --no-install-recommends install python3 python3-pip python3-cryptography python3-six python3-yaml python3-click python3-markdown python3-requests python3-requests-oauthlib \
        sqlite3 iputils-ping util-linux dumb-init git curl ca-certificates && \
    pip3 --no-cache-dir install apprise==1.4.0 && \
    rm -rf /var/lib/apt/lists/* && \
    apt --yes autoremove
RUN npm i -g pnpm@8.5.1
RUN npm i -g turbo@1.10.3

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
FROM node:16-buster-slim AS runner
WORKDIR /app

COPY --from=server-builder /app/pruned/node_modules ./node_modules
COPY --from=server-builder /app/pruned/dist ./dist
COPY --from=server-builder /app/pruned/package.json ./package.json
COPY --from=web-builder /app/apps/web/dist ./html

COPY ./wait-for-it.sh /opt/wait-for-it.sh
COPY ./startup.sh /opt/startup.sh

EXPOSE 3000

CMD [ "/opt/startup.sh" ]
