FROM node:20.11.1-alpine

WORKDIR /app

COPY package.json ./

RUN npm i 

COPY . .

RUN npm run build

RUN prisma generate

EXPOSE 5000

CMD [ "npm" "start"]