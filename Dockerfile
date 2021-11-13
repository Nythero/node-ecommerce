FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Le da permisos al usuario node para escribir en /usr/src/app
# Como comentario, notar que el comando RUN nos permite ejecutar culquier comando bash valido.
RUN chown -R node:users /usr/src/app/data.json

# Habilita el usuario node. Por defecto, los containers corren los comandos con el usuario root
USER node

EXPOSE 5000

CMD ["node", "./src/server.js"]
