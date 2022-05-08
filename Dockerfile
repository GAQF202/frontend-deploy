#FROM nginx:1.21.6-alpine
#FROM nginx:1.21.6-alpine
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY ./build/ /usr/share/nginx/html
#EXPOSE 4000



#FROM node:latest

#WORKDIR /home/nodejs/app
#COPY . .
#RUN npm install --production
# start app
#CMD ["npm", "start"]



# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]
