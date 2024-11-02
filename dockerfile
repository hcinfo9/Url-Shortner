FROM node:22.11.0

WORKDIR /app

COPY package*.json ./

RUN npm install

# Rebuild bcrypt to ensure it is compiled correctly for the current environment
RUN npm rebuild bcrypt --build-from-source

COPY . .


# Run Prisma generate
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:dev"]
