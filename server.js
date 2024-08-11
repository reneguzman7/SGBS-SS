import express from 'express';
import loginRoutes from './public/routes/login.routes.js';
import clientesRoutes from './public/routes/clientes.routes.js';
import incidentesRoutes from './public/routes/incidentes.routes.js';
import pkg from 'pg';
import dotenv from 'dotenv';
// Cargar variables de entorno
dotenv.config();
const { Pool } = pkg;
const app = express();
const port = 3000;

// Configuraci�n de conexi�n a la base de datos
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

// Verificar la conexi�n a la base de datos
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conexi�n exitosa:', res.rows[0]);
  }
});

// Configuraci�n de middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use(loginRoutes);
app.use(clientesRoutes);
app.use(incidentesRoutes);
// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

export default app;
