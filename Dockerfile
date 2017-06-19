FROM node:8.1.2

RUN npm install webpack -g && npm cache clean --force

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install && npm cache clean --force
COPY . /usr/src/app/

CMD [ "npm", "run", "test" ]
