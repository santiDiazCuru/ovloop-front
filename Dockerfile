FROM node:10-alpine
WORKDIR /app
COPY ./index.js /app/index.js
COPY ./package.json /app/package.json
COPY ./webpack.config.js /app/webpack.config.js


#WORKDIR /app/client
#RUN ["npm", "install"]
#RUN ["npm", "run", "build"]


WORKDIR /app
RUN ["npm", "install"]
EXPOSE 7777
ENTRYPOINT ["npm", "run", "dev"]