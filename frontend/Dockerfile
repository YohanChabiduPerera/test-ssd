# Dockerfile for React client

# Build react client
FROM node:16.17.0-alpine

# Working directory
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --verbose

# Copy only the necessary files
COPY public ./public
COPY src ./src
COPY .env ./

# Optionally copy any other required files
COPY config ./config
COPY .env.production ./

EXPOSE 3000

CMD ["npm", "start"]