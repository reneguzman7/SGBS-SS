import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import pkg from 'pg';
import cors from 'cors';

dotenv.config();

const { Pool } = pkg;
const app = express();

// Configuraci�n de middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  }
});

// Endpoint para registrar un nuevo incidente
app.post('/incidentes', async (req, res) => {
  const {
    documentoidentidad = 'N/A',
    fechaincidente,
    lugarincidente = 'N/A',
    descripcion = '',
    evidencia = 'N/A',
    tipoincidente = 'General',
    estadoincidente = 'Abierto'
  } = req.body;

  try {
    const query = `
      INSERT INTO GESTION_INCIDENTES (
        DOCUMENTOIDENTIDAD, FECHAINCIDENTE, LUGARINCIDENTE, DESCRIPCION, EVIDENCIA, TIPOINCIDENTE, ESTADOINCIDENTE, CREATEDAT
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, NOW()
      )
    `;
    await pool.query(query, [
      documentoidentidad, fechaincidente, lugarincidente, descripcion, evidencia, tipoincidente, estadoincidente
    ]);
    res.status(201).json({ message: 'Incidente registrado exitosamente' });
  } catch (err) {
    console.error('Error al registrar incidente:', err);
    res.status(500).json({ error: 'Error al registrar incidente' });
  }
});

// Endpoint para obtener todos los incidentes
app.get('/incidentes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM GESTION_INCIDENTES');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error al obtener incidentes:', err);
    res.status(500).json({ error: 'Error al obtener incidentes' });
  }
});



// Endpoint para obtener un incidente por su ID
app.get('/incidentes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM GESTION_INCIDENTES WHERE DOCUMENTOIDENTIDAD = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Documento de identidad no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener documento de identidad:', err);
    res.status(500).json({ error: 'Error al obtener documento de identidad' });
  }
});
// Endpoint para actualizar un incidente
app.patch('/incidentes/:id', async (req, res) => {
  const { id } = req.params;
  const {
    fechaincidente,
    lugarincidente,
    descripcion,
    evidencia,
    tipoincidente,
    estadoincidente
  } = req.body;

  // Construcci�n din�mica de la consulta SQL
  let query = 'UPDATE GESTION_INCIDENTES SET';
  const values = [];
  let index = 1;

  if (fechaincidente) {
    query += ` FECHAINCIDENTE = $${index++},`;
    values.push(fechaincidente);
  }

  if (lugarincidente) {
    query += ` LUGARINCIDENTE = $${index++},`;
    values.push(lugarincidente);
  }

  if (descripcion !== undefined) {
    query += ` DESCRIPCION = $${index++},`;
    values.push(descripcion);
  }

  if (evidencia !== undefined) {
    query += ` EVIDENCIA = $${index++},`;
    values.push(evidencia);
  }

  if (tipoincidente) {
    query += ` TIPOINCIDENTE = $${index++},`;
    values.push(tipoincidente);
  }

  if (estadoincidente) {
    query += ` ESTADOINCIDENTE = $${index++},`;
    values.push(estadoincidente);
  }

  // Eliminar la �ltima coma y a�adir la cl�usula WHERE
  query = query.slice(0, -1); // Eliminar la �ltima coma
  query += ` WHERE DOCUMENTOIDENTIDAD = $${index}`;

  values.push(id);

  try {
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Documento de identidad no encontrado' });
    }

    res.status(200).json({ message: 'Incidente actualizado exitosamente' });
  } catch (err) {
    console.error('Error al actualizar incidente:', err);
    res.status(500).json({ error: 'Error al actualizar incidente' });
  }
});
export default app;
