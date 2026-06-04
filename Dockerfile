#Use lightweight node image
FROM node:18

#create app dir
WORKDIR /app

#copy package files first(for caching)
COPY package*.json ./

#install dependencies
RUN npm install

#copy rest of code
COPY . .

RUN npx prisma generate

EXPOSE 5000

CMD ["node","server.js"]


