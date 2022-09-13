FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install && npm install nodemon -g

# Copy in the source code
COPY . .

# Do not use root user
USER node

# Expose Port
EXPOSE 3002

# Run the app
CMD ["node", "index.js"]
