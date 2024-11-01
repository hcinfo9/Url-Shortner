FROM node:22.11.0

WORKDIR /app

COPY package*.json ./

RUN npm install

# Rebuild bcrypt to ensure it is compiled correctly for the current environment
RUN npm rebuild bcrypt --build-from-source

COPY . .

# Run Prisma generate
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
