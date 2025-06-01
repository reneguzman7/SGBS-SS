# Usa Node.js LTS oficial
FROM node:18-alpine

# Crea directorio de la aplicación
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Copia el resto del código
COPY . .

# Crea usuario no root para seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Cambia propiedad de archivos
RUN chown -R nextjs:nodejs /usr/src/app
USER nextjs

# Expone el puerto
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV=production

# Comando para iniciar la aplicación
CMD ["node", "server.js"]