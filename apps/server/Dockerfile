###################################################################
# Stage 1: Create pruned version of b2b-bo app                    #
#          and generates node_modules folder(s)                   #
# ----------------------------------------------------------------#
# Notes:                                                          #
#   1. depend on .dockerignore, you must at least                 #
#      ignore: all **/node_modules folders, ...                   #
###################################################################
FROM node:alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm i -g turbo
COPY . .
RUN turbo prune --scope="@locaze/server" --docker


###################################################################
# Stage 2: Install and build the app                              #
###################################################################
FROM node:alpine AS installer
ARG ENV
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN npm i -g pnpm@8.5.1 turbo

# First install the dependencies (as they change less often)
# COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile --ignore-scripts
# Build the project
COPY --from=builder /app/out/full/ .
# COPY apps/server/deploy/$ENV/.env.$ENV ./apps/server/.env
RUN turbo build --filter=@locaze/server
RUN pnpm --filter=@locaze/server --prod deploy pruned --ignore-scripts

###################################################################
# Stage 3: Install production packages                            #
###################################################################

###################################################################
# Stage 3: Extract a minimal image from the build                 #
###################################################################
FROM node:alpine AS runner
WORKDIR /app

COPY --from=installer /app/pruned/node_modules ./node_modules
COPY --from=installer /app/apps/server/dist ./dist
EXPOSE $PORT

ENTRYPOINT ["tail", "-f", "/dev/null"]
# CMD [ "node"," dist/main.js" ]