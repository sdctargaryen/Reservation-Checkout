FROM node:11.14.0

# Create app directory
WORKDIR /client/src/index

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD ["npm", "start"]


# FROM node:11
# WORKDIR // when you eventually pull down image, wherever you pull down, it will be stored in this directory
# COPY . .   // copy all of teh files, folder structure
# RUN  npm install   // Tell it a command the run
# EXPOSE          // expose a certain port of container to the world
# CMD ["npm", "run", "start"]        // give it a command
# becareful of files, will try to snapshot the data

# docker build -t (docker hub)/ HIT() :(tag name) --> grab a wokring image
# push & then pull it

# sudo docker pull (tracyhandle};

# sudo docker images
# sudo docker ps

# sudo docker rmi -f (5 id number)