FROM node:22-alpine

WORKDIR /usr/src/app 

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

EXPOSE 5000

CMD ["npm", "run","up"]

