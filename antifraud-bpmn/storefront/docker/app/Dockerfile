FROM node:10.13.0-alpine

RUN mkdir -p /code

WORKDIR /code

COPY src/ /code/src
COPY package.json /code

RUN npm install
RUN npm install forever -g

EXPOSE 3000

ENTRYPOINT ["forever"]
CMD ["/code/src/app.js"]
