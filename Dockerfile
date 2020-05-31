FROM node:12
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/bin
RUN mkdir -p /usr/src/app/src
RUN mkdir -p /usr/src/app/env

COPY ./broker-mqtt/bin /usr/src/app/bin
COPY ./broker-mqtt/src /usr/src/app/src
COPY ./broker-mqtt/env /usr/src/app/env

COPY ./broker-mqtt/package.json /usr/src/app

WORKDIR /usr/src/app

RUN npm install
EXPOSE 9001
CMD npm run dev-docker
