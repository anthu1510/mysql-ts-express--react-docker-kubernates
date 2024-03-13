FROM node:20.11.1-alpine3.19

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 9000

CMD npm run preview