FROM node:12.18-alpine

WORKDIR /usr/src/app

COPY server/package*.json ./

RUN npm install

COPY ./server .
