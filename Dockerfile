FROM node:18-buster-slim AS build

WORKDIR /app

COPY package*.json ./


RUN npm install

RUN node crm.js

COPY . .


RUN npm run build


FROM nginx:1.27-alpine-slim

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf


COPY --from=build /app/build /usr/share/nginx/html


EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]
