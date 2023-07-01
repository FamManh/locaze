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
RUN turbo prune --scope="@locaze/web" --scope="@locaze/web" --docker


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
RUN turbo build --filter=@locaze/web


###################################################################
# Stage 3: Extract a minimal image from the build                 #
###################################################################
FROM nginx:1.24.0-alpine-slim AS runner

RUN rm -rf /usr/share/nginx/html/*
# RUN rm /etc/nginx/conf.d/default.conf
COPY --from=installer /app/apps/web/dist /usr/share/nginx/html

# HEALTHCHECK goes here, if needed
# ENTRYPOINT goes here, if needed
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]