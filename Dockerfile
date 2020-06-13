FROM node:14.4.0-alpine

WORKDIR /usr/src/app

COPY server/package*.json ./

RUN npm install

COPY ./server .
