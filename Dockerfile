FROM node:alpine

WORKDIR /usr/src/app

COPY . ./

RUN npm i -g

ENTRYPOINT ["geo"]

CMD [ "-h" ]

