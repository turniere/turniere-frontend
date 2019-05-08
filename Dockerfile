FROM node:8-alpine

COPY js /srv/js
COPY pages /srv/pages
COPY static /srv/static
COPY next.config.js package.json package-lock.json server.js style.css yarn.lock /srv/
WORKDIR /srv
RUN yarn install
RUN yarn build

EXPOSE 80
ENV TURNIERE_API_URL=https://api.turnie.re
CMD yarn start