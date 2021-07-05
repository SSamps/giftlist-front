# State 1
FROM node:current-alpine3.13 AS build
WORKDIR /app
RUN npm install npm@7.12.0 -g
RUN apk --no-cache --virtual build-dependencies add \
    python3 \
    make \
    g++
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run compileScss
ARG REACT_APP_BACKEND_BASE_URL
RUN REACT_APP_BACKEND_BASE_URL=$REACT_APP_BACKEND_BASE_URL npm run build

# Stage 2
FROM node:current-alpine3.13
WORKDIR /app
RUN npm install express
RUN npm install path
COPY --from=build /app/build ./build
COPY server.js .
CMD node server.js