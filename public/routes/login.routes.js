import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import pkg from 'pg';
import bcrypt from 'bcrypt';
import cors from 'cors';

dotenv.config();

const { Pool } = pkg;
const app = express();

// Configuraci�n de middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  } : false
});

// Endpoint para registrar un nuevo usuario
app.post('/register', async (req, res) => {
  console.log('Solicitud recibida en /register', req.body);
  const { email, password } = req.body;

  try {
    // Validar entrada
    if (!email || !password) {
      return res.status(400).json({ error: 'Correo y contrase�a son requeridos' });
    }

    // Verificar si el usuario ya existe
    const userExists = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'El correo electr ico ya est e1 registrado' });
    }

    // Hash de la contrase f1a
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario en la base de datos
    const result = await pool.query(
      'INSERT INTO usuarios (correo, contrasena, rol, createdat) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [email, hashedPassword, 'user']
    );

    // Responder con los datos del usuario registrado
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error en /register:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// Endpoint para iniciar sesi�n
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Ingreso fallido' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.contrasena);

    if (!isMatch) {
      return res.status(400).json({ error: 'Contrase�a incorrecta' });
    }

    res.json({ message: 'Inicio de sesi�n exitoso' });
  } catch (error) {
    console.error('Error en /login:', error);
    res.status(500).json({ error: 'Error al iniciar sesi�n' });
  }
});

// Endpoint para obtener todos los usuarios
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error en /users:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

export default app;
