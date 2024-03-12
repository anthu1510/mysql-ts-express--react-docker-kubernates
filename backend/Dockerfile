FROM node:20.11.1-alpine3.19

WORKDIR /app

COPY package.json ./

RUN npm i 

COPY . .

RUN npx prisma generate

RUN npm run postmig

RUN npm run build

EXPOSE 5000

CMD npm start