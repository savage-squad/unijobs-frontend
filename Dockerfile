FROM node:16-alpine3.12 as build

WORKDIR /build

COPY . /build

RUN npm install && \
 npm run build

FROM nginx:1.21.4-alpine

COPY --from=build /build/build /usr/share/nginx/html

EXPOSE 80