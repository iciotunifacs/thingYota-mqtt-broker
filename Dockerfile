FROM node:12
RUN mkdir -p /usr/src/mqtt
RUN mkdir -p /usr/src/mqtt/bin
RUN mkdir -p /usr/src/mqtt/src
RUN mkdir -p /usr/src/mqtt/env

COPY ./broker-mqtt/bin /usr/src/mqtt/bin
COPY ./broker-mqtt/src /usr/src/mqtt/src
COPY ./broker-mqtt/env /usr/src/mqtt/env

COPY ./broker-mqtt/package.json /usr/src/mqtt

WORKDIR /usr/src/mqtt

RUN npm install
EXPOSE 9001
CMD npm run dev-docker
