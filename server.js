const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Configurar la conexi�n a la base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SGBS-SS',
  password: 'Postgres2024',
  port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conexi�n exitosa:', res.rows[0]);
  }
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    const userExists = await pool.query('SELECT * FROM "USUARIOS" WHERE CORREO = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'El correo electr�nico ya est� registrado' });
    }

    // Hash de la contrase�a
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insertar el nuevo usuario en la base de datos
    const result = await pool.query(
      'INSERT INTO "USUARIOS" (CORREO, CONTRASENA, ROL, CREATEDAT) VALUES ($1, $2, $3, NOW()) RETURNING *',
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
    const result = await pool.query('SELECT * FROM "USUARIOS" WHERE CORREO = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
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
    const result = await pool.query('SELECT * FROM "USUARIOS"');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error en /users:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
