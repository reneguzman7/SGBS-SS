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

// Configuraci�n de conexi�n a la base de datos
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: parseInt(process.env.PORT, 10),
  ssl: {
    require: true,
    rejectUnauthorized: false // For development only
  },
  connectionTimeoutMillis: 10000, // Aumentar el tiempo de espera a 10 segundos
  idleTimeoutMillis: 30000, // Tiempo máximo de inactividad de una conexión
  max: 20 // Máximo número de clientes en el pool
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
// Servir archivos estáticos
app.use(express.static('public'));

// Ruta para el endpoint raíz
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/public/html/index.html');
});

// Ruta explícita para index.html
app.get('/index.html', (req, res) => {
  res.sendFile(process.cwd() + '/public/html/index.html');
});

// Ruta para el menú principal
app.get('/menu.html', (req, res) => {
  res.sendFile(process.cwd() + '/public/html/menu.html');
});

// Rutas explícitas para cada HTML principal
app.get('/clientes.html', (req, res) => {
  res.sendFile(process.cwd() + '/public/html/clientes.html');
});
app.get('/aseguradoras.html', (req, res) => {
  res.sendFile(process.cwd() + '/public/html/aseguradoras.html');
});
app.get('/gestionPagos.html', (req, res) => {
  res.sendFile(process.cwd() + '/public/html/gestionPagos.html');
});
app.get('/manejoIncidentes.html', (req, res) => {
  res.sendFile(process.cwd() + '/public/html/manejoIncidentes.html');
});
app.get('/administracionSistema.html', (req, res) => {
  res.sendFile(process.cwd() + '/public/html/administracionSistema.html');
});

// Rutas
app.use(loginRoutes);
app.use(clientesRoutes);
app.use(incidentesRoutes);
// Iniciar servidor
app.listen(3000, () => {
  console.log(`Servidor corriendo en http://localhost:3000`);
});

export default app;
