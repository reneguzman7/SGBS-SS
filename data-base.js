const express = require('express');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config(); // Para cargar las variables de entorno desde un archivo .env
const bcrypt = require('bcryptjs');
const path = require('path');

const prisma = new PrismaClient();
const app = express();
app.use(express.json()); // Para parsear el cuerpo de las solicitudes en formato JSON

const PORT = process.env.PORT || 3000; // Usa el puerto especificado en las variables de entorno o el puerto 3000 por defecto

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

// Ruta para crear un nuevo usuario
app.post('/users', async (req, res) => {
  try {
    const { id, email, password } = req.body;
    if (!id || !email || !password) {
      return res.status(400).json({ error: 'El id, email y password son obligatorios' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await prisma.user.create({
      data: { id, email, password: hashedPassword },
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
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(400).json({ error: 'Se requiere al menos uno de los campos: email o password' });
    }

    const data = {};
    if (email) data.email = email;
    if (password) data.password = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: data,
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
      where: { id: id },
    });
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});

// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'El email y password son obligatorios' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ message: 'Ingreso Satisfactorio' });
    } else {
      res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} Servidor iniciado en el puerto ${PORT}`);
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
