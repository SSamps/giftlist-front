# State 1
FROM node:20.16-alpine3.19 AS build
WORKDIR /app
RUN npm install -g npm@10.8.1
RUN apk --no-cache --virtual build-dependencies add \
    python3 \
    make \
    g++
COPY package*.json ./
RUN npm install 
COPY . .
RUN mv /app/index.html /app/main.html
RUN npm run buildScss
RUN npm run buildApp
RUN npm run buildServer

# Stage 2
FROM node:20.16-alpine3.19
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/server.cjs .
CMD ["node", "server.cjs"]