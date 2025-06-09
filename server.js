import express from 'express';
import loginRoutes from './public/routes/login.routes.js';
import clientesRoutes from './public/routes/clientes.routes.js';
import incidentesRoutes from './public/routes/incidentes.routes.js';
import pkg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Cargar variables de entorno
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pkg;
const app = express();

// Configuración de conexión a la base de datos
const pool = new Pool({
  user: process.env.USER || process.env.DB_USER,
  host: process.env.HOST || process.env.DB_HOST,
  database: process.env.DATABASE || process.env.DB_NAME,
  password: process.env.PASSWORD || process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || process.env.PORT || '5432', 10),
  ssl: process.env.NODE_ENV === 'production' ? {
    require: true,
    rejectUnauthorized: false
  } : false,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
  max: 20
});

// Verificar la conexi�n a la base de datos
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conexi�n exitosa:', res.rows[0]);
  }
});

// Configuración de middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para el endpoint raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

// Ruta explícita para index.html
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

// Ruta para el menú principal
app.get('/menu.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'menu.html'));
});

// Rutas explícitas para cada HTML principal
app.get('/clientes.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'clientes.html'));
});
app.get('/aseguradoras.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'aseguradoras.html'));
});
app.get('/gestionPagos.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'gestionPagos.html'));
});
app.get('/manejoIncidentes.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'manejoIncidentes.html'));
});
app.get('/administracionSistema.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'administracionSistema.html'));
});

// Rutas
app.use(loginRoutes);
app.use(clientesRoutes);
app.use(incidentesRoutes);

// Puerto dinámico para producción
const PORT = process.env.PORT || 3000;

// Iniciar servidor solo si no estamos en entorno de prueba
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}

export default app;
