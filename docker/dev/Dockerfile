FROM node:lts-alpine3.15
WORKDIR /app
COPY package*.json ./
RUN apk --no-cache --virtual build-dependencies add \
    python3 \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies
CMD npm run devLocal