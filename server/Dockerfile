FROM alpine:latest

RUN apk update && \
	apk add --no-cache nodejs nodejs-npm && \
	npm install pg express

ADD app /node-app/app
WORKDIR /node-app

EXPOSE 8080

CMD ["node", "app/server.js"]

#COPY entrypoint.sh /tmp/
#ENTRYPOINT /tmp/entrypoint.sh
