FROM node:16 as builder
WORKDIR /usr/share/app
COPY . /usr/share/app
RUN npm install
RUN npm run build