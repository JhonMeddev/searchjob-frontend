FROM node:18.13.0

WORKDIR /app

COPY . ./

RUN npm install -g @angular/cli@17.0.9

RUN npm install

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
