FROM node:10.13.0-alpine

RUN mkdir -p /code

WORKDIR /code

COPY static/ /code
COPY package.json /code
COPY webpack.config.js /code
COPY Gruntfile.js /code

RUN npm install

ENTRYPOINT ["npm"]
CMD ["run", "static"]
