FROM node:latest

WORKDIR /server

COPY . /server
ADD package.json /server/package.json
RUN yarn

EXPOSE 8000
CMD yarn start
