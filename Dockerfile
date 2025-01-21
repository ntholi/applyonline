# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=21.7.2
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Next.js"

# Next.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Install pnpm
ARG PNPM_VERSION=9.15.4
RUN npm install -g pnpm@$PNPM_VERSION


# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

# Copy application code
COPY . .

# Build application
RUN --mount=type=secret,id=TURSO_DATABASE_URL \
    --mount=type=secret,id=TURSO_AUTH_TOKEN \
    --mount=type=secret,id=AUTH_SECRET \
    --mount=type=secret,id=AUTH_GOOGLE_ID \
    --mount=type=secret,id=AUTH_GOOGLE_SECRET \
    --mount=type=secret,id=FIREBASE_PROJECT_ID \
    --mount=type=secret,id=FIREBASE_CLIENT_EMAIL \
    --mount=type=secret,id=FIREBASE_PRIVATE_KEY \
    --mount=type=secret,id=FIREBASE_STORAGE_BUCKET \
    --mount=type=secret,id=AUTH_TRUST_HOST \
    TURSO_DATABASE_URL="$(cat /run/secrets/TURSO_DATABASE_URL)" \
    TURSO_AUTH_TOKEN="$(cat /run/secrets/TURSO_AUTH_TOKEN)" \
    AUTH_SECRET="$(cat /run/secrets/AUTH_SECRET)" \
    AUTH_GOOGLE_ID="$(cat /run/secrets/AUTH_GOOGLE_ID)" \
    AUTH_GOOGLE_SECRET="$(cat /run/secrets/AUTH_GOOGLE_SECRET)" \
    FIREBASE_PROJECT_ID="$(cat /run/secrets/FIREBASE_PROJECT_ID)" \
    FIREBASE_CLIENT_EMAIL="$(cat /run/secrets/FIREBASE_CLIENT_EMAIL)" \
    FIREBASE_PRIVATE_KEY="$(cat /run/secrets/FIREBASE_PRIVATE_KEY)" \
    FIREBASE_STORAGE_BUCKET="$(cat /run/secrets/FIREBASE_STORAGE_BUCKET)" \
    AUTH_TRUST_HOST="$(cat /run/secrets/AUTH_TRUST_HOST)" \
    npx next build --experimental-build-mode compile

# Remove development dependencies
RUN pnpm prune --prod


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Adjust entrypoint to be executable on Linux
RUN chmod +x ./docker-entrypoint.js

# Entrypoint sets up the container.
ENTRYPOINT [ "/app/docker-entrypoint.js" ]

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "pnpm", "run", "start" ]
