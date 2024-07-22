const express = require('express');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config(); // Para cargar las variables de entorno desde un archivo .env

const prisma = new PrismaClient();
const app = express();
app.use(express.json()); // Para parsear el cuerpo de las solicitudes en formato JSON

const PORT = process.env.PORT || 3000; // Usa el puerto especificado en las variables de entorno o el puerto 3000 por defecto

// Ruta para crear un nuevo usuario
app.post('/users', async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email || !name) {
      return res.status(400).json({ error: 'El email y el nombre son obligatorios' });
    }
    const newUser = await prisma.user.create({
      data: { email, name },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

// Ruta para leer todos los usuarios
app.get('/users', async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// Ruta para actualizar un usuario
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name } = req.body;
    if (!email && !name) {
      return res.status(400).json({ error: 'Se requiere al menos uno de los campos: email o name' });
    }
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { email, name },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});

// Ruta para eliminar un usuario
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

// Maneja el cierre de la aplicación
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Desconectado de la base de datos');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  console.log('Desconectado de la base de datos');
  process.exit(0);
});
