###################################################################
# Stage 1: Create pruned version of b2b-bo app                    #
#          and generates node_modules folder(s)                   #
# ----------------------------------------------------------------#
# Notes:                                                          #
#   1. depend on .dockerignore, you must at least                 #
#      ignore: all **/node_modules folders, ...                   #
###################################################################
FROM node:16-alpine AS turbo-prune
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm i -g turbo@1.10.3
COPY . .
RUN turbo prune --scope="@locaze/server" --docker


###################################################################
# Stage 2: Install and build the app                              #
###################################################################
FROM node:16-alpine AS installer
ARG ENV
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN npm i -g pnpm@8.5.1 turbo@1.10.3

# First install the dependencies (as they change less often)
# COPY .gitignore .gitignore
COPY --from=turbo-prune /app/out/json/ .
COPY --from=turbo-prune /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile --ignore-scripts
# Build the project
COPY --from=turbo-prune /app/out/full/ .
# COPY apps/server/deploy/$ENV/.env.$ENV ./apps/server/.env
RUN turbo build --filter=@locaze/web
RUN turbo build --filter=@locaze/server
RUN pnpm --filter=@locaze/server --prod deploy pruned --ignore-scripts

# https://github.com/kelektiv/node.bcrypt.js/issues/800
RUN cd pruned && npm rebuild bcrypt

###################################################################
# Stage 3: Extract a minimal image from the build                 #
###################################################################
FROM node:16-alpine AS runner
WORKDIR /app

COPY --from=installer /app/pruned/dist ./dist
COPY --from=installer /app/pruned/node_modules ./node_modules
COPY ./apps/server/.env.development .env
EXPOSE 3000

# ENTRYPOINT ["tail", "-f", "/dev/null"]
CMD [ "node","dist/main.js" ]
