# Usa Node.js LTS oficial (no Alpine)
FROM node:18

WORKDIR /usr/src/app

# Copia los archivos de dependencias primero
COPY package*.json ./

# Instala dependencias limpias (elimina node_modules si existe)
RUN rm -rf node_modules && npm install

# Copia el resto del código
COPY . .

EXPOSE 3001

CMD ["node", "server.js"]