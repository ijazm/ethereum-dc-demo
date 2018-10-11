FROM node:9.11.1
COPY test /test
WORKDIR /test  
RUN npm install
RUN npm install -g protractor
WORKDIR /test/conf
ENTRYPOINT ["protractor", "conf.js"]
