import express from 'express';
import loginRoutes from './routes/login.routes.js';
import clientesRoutes from './routes/clientes.routes.js';
import pkg from 'pg';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();
const { Pool } = pkg;
const app = express();
const port = 3000;

// Configuración de conexión a la base de datos
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

// Verificar la conexión a la base de datos
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conexión exitosa:', res.rows[0]);
  }
});

// Configuración de middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use(loginRoutes);
app.use(clientesRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

export default app;
