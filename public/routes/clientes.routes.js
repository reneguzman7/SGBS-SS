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
      // Validación de datos obligatorios
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

export default app;
