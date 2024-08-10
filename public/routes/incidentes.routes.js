import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import pkg from 'pg';
import cors from 'cors';

dotenv.config();

const { Pool } = pkg;
const app = express();

// Configuración de middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de conexión a la base de datos
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
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

export default app;
