# base node image
FROM node:18-bullseye-slim as base
# set for base and all layer that inherit from it
ENV NODE_ENV production

# Install all node_modules, including dev dependencies
FROM base as deps
WORKDIR /myapp
ADD package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Setup production node_modules
FROM base as production-deps
WORKDIR /myapp
COPY --from=deps /myapp/node_modules /myapp/node_modules
ADD package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true

# Build the app
FROM base as build
WORKDIR /myapp
COPY --from=deps /myapp/node_modules /myapp/node_modules
ADD . .
RUN yarn build

# Finally, build the production image with minimal footprint
FROM base
ENV password="0000"
ENV NODE_ENV="production"
WORKDIR /myapp
COPY --from=production-deps /myapp/node_modules /myapp/node_modules
COPY --from=build /myapp/build /myapp/build
COPY --from=build /myapp/public /myapp/public
COPY --from=build /myapp/package.json /myapp/package.json
EXPOSE 3000
CMD [ "yarn", "remix-serve", "./build/index.js" ]
