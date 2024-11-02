FROM node:22.11.0

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm rebuild bcrypt --build-from-source

COPY . .


RUN npx prisma generate


EXPOSE 3000


CMD ["npm", "run", "start:dev"]
