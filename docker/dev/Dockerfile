FROM node:20.16-alpine3.19
WORKDIR /app
COPY package*.json ./
RUN apk --no-cache --virtual build-dependencies add \
    python3 \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies

CMD ["npm", "run", "devLocal"]