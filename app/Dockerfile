FROM node:16.20.2-alpine

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn prisma generate

CMD yarn start:dev
