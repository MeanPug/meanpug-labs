FROM node:10.13.0-alpine

ENV DEBUG worker:*

RUN mkdir -p /code

WORKDIR /code

COPY src/ /code/src
COPY package.json /code

RUN npm install
RUN npm install forever -g

ENTRYPOINT ["forever"]
CMD ["/code/src/worker.js"]
