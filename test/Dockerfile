FROM node:9.11.1
COPY protractorTest /protrcatorTest
WORKDIR /protractorTest  
RUN npm install
RUN npm install -g protractor
WORKDIR /protractorTest/conf
ENTRYPOINT ["protractor", "conf.js"]
