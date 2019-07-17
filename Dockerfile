FROM node:10-alpine
WORKDIR /app
COPY . .
#COPY ./index.js /app/index.js
#COPY ./package.json /app/package.json
#COPY ./webpack.config.js /app/webpack.config.js


#WORKDIR /app
RUN ["npm", "install"]
RUN ["npm", "run", "build"]
EXPOSE 7777
ENTRYPOINT ["npm", "start"]