# syntax=docker/dockerfile:1

FROM node:22-alpine

WORKDIR /build/frontend

COPY public public
COPY src src
COPY tsconfig.json tsconfig.json
COPY webpack.config.js webpack.config.js
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["npm", "start"]
