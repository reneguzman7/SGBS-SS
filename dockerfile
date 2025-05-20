# Usa Node.js LTS oficial (no Alpine)
FROM node:18

WORKDIR /usr/src/app

# Copia los archivos de dependencias primero
COPY package*.json ./

# Instala dependencias limpias (NO copies node_modules desde tu máquina)
RUN npm install --production

# Copia el resto del código, pero ignora node_modules si existe
COPY . .

EXPOSE 3001

CMD ["node", "server.js"]