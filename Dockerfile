FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Habilita el usuario node. Por defecto, los containers corren los comandos con el usuario root
USER node

EXPOSE 5000

CMD ["node", "./src/server.js"]
