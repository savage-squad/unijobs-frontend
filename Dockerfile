FROM node:16.13.0 as build

WORKDIR /build

COPY . /build

RUN npm --no-package-lock install && \
 npm run build

FROM nginx:alpine

COPY --from=build /build/build /usr/share/nginx/html

COPY devops/nginx/nginx.conf /etc/nginx/nginx.conf
COPY devops/nginx/proxy.conf /etc/nginx/proxy.conf
COPY devops/nginx/server.conf /etc/nginx/server.conf
COPY devops/nginx/mime.types /etc/nginx/mime.types
RUN mkdir /etc/nginx/logs

EXPOSE 80