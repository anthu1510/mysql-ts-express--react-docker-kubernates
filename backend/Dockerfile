FROM node:20.11.1-alpine3.19

WORKDIR /app

COPY package.json ./

RUN npm i 

COPY . .

ENV DATABASE_URL=mysql://root:rootpwd@mysqldb:3306/mern_db

RUN npx prisma generate

RUN npm run postmig

RUN npm run build

EXPOSE 5000

CMD npm start