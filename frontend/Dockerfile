FROM node:10-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm i

RUN npm run build

EXPOSE 5000

CMD [ "npx", "serve", "-s", "build" ]