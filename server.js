const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');  // Usaremos bcrypt para encriptar contrase�as

const app = express();
const port = 3000;

// Configuraci�n de conexi�n a la base de datos
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
app.use(express.json());  // Usa express.json() en lugar de bodyParser
app.use(express.urlencoded({ extended: true }));

// Endpoint para registrar un nuevo usuario
// Endpoint para registrar un nuevo usuario
app.post('/register', async (req, res) => {
  console.log('Solicitud recibida en /register', req.body);
  const { email, password } = req.body;

  try {
    // Validar entrada
    if (!email || !password) {
      return res.status(400).json({ error: 'Correo y contrase a son requeridos' });
    }

    // Verificar si el usuario ya existe
    const userExists = await pool.query('SELECT * FROM "USUARIOS" WHERE CORREO = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'El correo electr nico ya est  registrado' });
    }

    // Hash de la contrase a
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

// Endpoint para iniciar sesi n
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
      return res.status(400).json({ error: 'Contrase a incorrecta' });
    }

    res.json({ message: 'Inicio de sesi n exitoso' });
  } catch (error) {
    console.error('Error en /login:', error);
    res.status(500).json({ error: 'Error al iniciar sesi n' });
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


// Endpoint para registrar un nuevo cliente
app.post('/clientes', async (req, res) => {
  const {
    documentoidentidad = 'N/A',
    nombrecompleto = 'N/A',
    correo = 'N/A',
    tipocliente = 'N/A',
    ciudad = 'N/A',
    direccion = 'N/A',
    telefonoaseguradora = 'N/A',
    aseguradora = 'N/A',
    tiposeguro = 'N/A',
    producto = null,
    poliza = null,
    deducible = 0.00,
    fechainicio,
    fechainiciovigencia = fechainicio,
    fechavencimientopoliza = null,
    tipo = 'N/A',
    status = 'Activo',
    causacancelacion = null,
    fechacancelacion = null,
    observaciones = ''
  } = req.body;

  console.log(req.body); // Agregar esto para depuración

  console.log({
    documentoidentidad, nombrecompleto, correo, tipocliente, ciudad, direccion, telefonoaseguradora, aseguradora, tiposeguro, fechainicio
  }); // Depuración

  try {
    // Validaci�n de datos obligatorios
    if (!documentoidentidad || !nombrecompleto || !correo || !tipocliente || !ciudad || !direccion || !telefonoaseguradora || !aseguradora || !tiposeguro || !fechainicio) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const query = `
      INSERT INTO CLIENTES (
        DOCUMENTOIDENTIDAD, NOMBRECOMPLETO, CORREO, TIPOCLIENTE, CIUDAD, DIRECCION, TELEFONOASEGURADORA, ASEGURADORA, TIPOSEGURO, PRODUCTO, POLIZA, DEDUCIBLE, FECHAINICIO, FECHAINICIOVIGENCIA, FECHAVENCIMIENTOPOLIZA, TIPO, STATUS, CAUSACANCELACION, FECHACANCELACION, OBSERVACIONES, CREATEDAT
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, NOW()
      )
    `;
    await pool.query(query, [
      documentoidentidad, nombrecompleto, correo, tipocliente, ciudad, direccion, telefonoaseguradora, aseguradora, tiposeguro, producto, poliza, parseFloat(deducible), fechainicio, fechainiciovigencia, fechavencimientopoliza, tipo, status, causacancelacion, fechacancelacion, observaciones
    ]);
    res.status(201).json({ message: 'Cliente registrado exitosamente' });
  } catch (err) {
    console.error('Error al registrar cliente:', err);
    res.status(500).json({ error: 'Error al registrar cliente' });
  }
});

// Endpoint para obtener todos los clientes
app.get('/clientes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM CLIENTES');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error al obtener clientes:', err);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

// Endpoint para obtener un cliente por su documento de identidad
app.get('/clientes/:documentoidentidad', async (req, res) => {
  const { documentoidentidad } = req.params;

  try {
    const query = 'SELECT * FROM CLIENTES WHERE DOCUMENTOIDENTIDAD = $1';
    const result = await pool.query(query, [documentoidentidad]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener cliente:', err);
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
});

// Endpoint para actualizar un cliente
app.put('/clientes/:documentoidentidad', async (req, res) => {
  const { documentoidentidad } = req.params;
  const {
    nombrecompleto,
    correo,
    tipocliente,
    ciudad,
    direccion,
    telefonoaseguradora,
    aseguradora,
    tiposeguro,
    producto,
    poliza,
    deducible,
    fechainicio,
    fechainiciovigencia,
    fechavencimientopoliza,
    tipo,
    status,
    causacancelacion,
    fechacancelacion,
    observaciones
  } = req.body;

  try {
    const query = `
      UPDATE CLIENTES SET
        NOMBRECOMPLETO = $1,
        CORREO = $2,
        TIPOCLIENTE = $3,
        CIUDAD = $4,
        DIRECCION = $5,
        TELEFONOASEGURADORA = $6,
        ASEGURADORA = $7,
        TIPOSEGURO = $8,
        PRODUCTO = $9,
        POLIZA = $10,
        DEDUCIBLE = $11,
        FECHAINICIO = $12,
        FECHAINICIOVIGENCIA = $13,
        FECHAVENCIMIENTOPOLIZA = $14,
        TIPO = $15,
        STATUS = $16,
        CAUSACANCELACION = $17,
        FECHACANCELACION = $18,
        OBSERVACIONES = $19
      WHERE DOCUMENTOIDENTIDAD = $20
    `;
    await pool.query(query, [
      nombrecompleto, correo, tipocliente, ciudad, direccion, telefonoaseguradora, aseguradora, tiposeguro, producto, poliza, parseFloat(deducible), fechainicio, fechainiciovigencia, fechavencimientopoliza, tipo, status, causacancelacion, fechacancelacion, observaciones, documentoidentidad
    ]);
    res.status(200).json({ message: 'Cliente actualizado exitosamente' });
  } catch (err) {
    console.error('Error al actualizar cliente:', err);
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
});

// Endpoint para eliminar un cliente
app.delete('/clientes/:documentoidentidad', async (req, res) => {
  const { documentoidentidad } = req.params;

  try {
    const query = 'DELETE FROM CLIENTES WHERE DOCUMENTOIDENTIDAD = $1';
    await pool.query(query, [documentoidentidad]);
    res.status(200).json({ message: 'Cliente eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar cliente:', err);
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
