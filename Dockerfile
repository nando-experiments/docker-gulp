FROM node:6.9
MAINTAINER Fernando Moreira <nandomoreira.me@gmail.com>

RUN npm install -g yarn
RUN yarn global add bower gulp http-server

RUN useradd --create-home --home-dir /home/docker --shell /bin/bash docker
WORKDIR /app
USER docker

# ADD ./src/* ./

# RUN yarn
# RUN gulp
