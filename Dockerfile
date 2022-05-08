#FROM nginx:1.21.6-alpine
#FROM nginx:1.21.6-alpine
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY ./build/ /usr/share/nginx/html
#EXPOSE 4000



FROM node:latest

WORKDIR /home/nodejs/app
COPY . .
RUN npm install --production
EXPOSE 4000
# start app
CMD ["npm", "start"]
