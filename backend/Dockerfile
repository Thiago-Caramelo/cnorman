FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 4000
CMD [ "node", "index.js" ]