FROM node:23-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm install

COPY . .
COPY wait-for-it.sh .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
