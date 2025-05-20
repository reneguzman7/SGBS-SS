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

  console.log(req.body); // Agregar esto para depuraci�n

  console.log({
    documentoidentidad, nombrecompleto, correo, tipocliente, ciudad, direccion, telefonoaseguradora, aseguradora, tiposeguro, fechainicio
  }); // Depuraci�n

  try {
    // Validaci�n de datos obligatorios
    if (!documentoidentidad || !nombrecompleto || !correo || !tipocliente || !ciudad || !direccion || !telefonoaseguradora || !aseguradora || !tiposeguro || !fechainicio) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const query = `
        INSERT INTO clientes (
          documentoidentidad, nombrecompleto, correo, tipocliente, ciudad, direccion, telefonoaseguradora, aseguradora, tiposeguro, producto, poliza, deducible, fechainicio, fechainiciovigencia, fechavencimientopoliza, tipo, status, causacancelacion, fechacancelacion, observaciones, createdat
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
    const result = await pool.query('SELECT * FROM clientes');
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
    const query = 'SELECT * FROM clientes WHERE documentoidentidad = $1';
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




app.patch('/clientes/:documentoidentidad', async (req, res) => {
  const { documentoidentidad } = req.params;

  try {
    // Obtener el cliente existente
    const queryGet = 'SELECT * FROM clientes WHERE documentoidentidad = $1';
    const result = await pool.query(queryGet, [documentoidentidad]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    const cliente = result.rows[0];

    // Construir la consulta de actualizaci�n din�micamente
    const fields = [];
    const values = [];

    if (req.body.nombrecompleto !== undefined) {
      fields.push('NOMBRECOMPLETO = $' + (values.length + 1));
      values.push(req.body.nombrecompleto);
    }
    if (req.body.correo !== undefined) {
      fields.push('CORREO = $' + (values.length + 1));
      values.push(req.body.correo);
    }
    if (req.body.tipocliente !== undefined) {
      fields.push('TIPOCLIENTE = $' + (values.length + 1));
      values.push(req.body.tipocliente);
    }
    if (req.body.ciudad !== undefined) {
      fields.push('CIUDAD = $' + (values.length + 1));
      values.push(req.body.ciudad);
    }
    if (req.body.direccion !== undefined) {
      fields.push('DIRECCION = $' + (values.length + 1));
      values.push(req.body.direccion);
    }
    if (req.body.telefonoaseguradora !== undefined) {
      fields.push('TELEFONOASEGURADORA = $' + (values.length + 1));
      values.push(req.body.telefonoaseguradora);
    }
    if (req.body.aseguradora !== undefined) {
      fields.push('ASEGURADORA = $' + (values.length + 1));
      values.push(req.body.aseguradora);
    }
    if (req.body.tiposeguro !== undefined) {
      fields.push('TIPOSEGURO = $' + (values.length + 1));
      values.push(req.body.tiposeguro);
    }
    if (req.body.producto !== undefined) {
      fields.push('PRODUCTO = $' + (values.length + 1));
      values.push(req.body.producto);
    }
    if (req.body.poliza !== undefined) {
      fields.push('POLIZA = $' + (values.length + 1));
      values.push(req.body.poliza);
    }
    if (req.body.deducible !== undefined) {
      fields.push('DEDUCIBLE = $' + (values.length + 1));
      values.push(parseFloat(req.body.deducible));
    }
    if (req.body.fechainicio !== undefined) {
      fields.push('FECHAINICIO = $' + (values.length + 1));
      values.push(req.body.fechainicio);
    }
    if (req.body.fechainiciovigencia !== undefined) {
      fields.push('FECHAINICIOVIGENCIA = $' + (values.length + 1));
      values.push(req.body.fechainiciovigencia);
    }
    if (req.body.fechavencimientopoliza !== undefined) {
      fields.push('FECHAVENCIMIENTOPOLIZA = $' + (values.length + 1));
      values.push(req.body.fechavencimientopoliza);
    }
    if (req.body.tipo !== undefined) {
      fields.push('TIPO = $' + (values.length + 1));
      values.push(req.body.tipo);
    }
    if (req.body.status !== undefined) {
      fields.push('STATUS = $' + (values.length + 1));
      values.push(req.body.status);
    }
    if (req.body.causacancelacion !== undefined) {
      fields.push('CAUSACANCELACION = $' + (values.length + 1));
      values.push(req.body.causacancelacion);
    }
    if (req.body.fechacancelacion !== undefined) {
      fields.push('FECHACANCELACION = $' + (values.length + 1));
      values.push(req.body.fechacancelacion);
    }
    if (req.body.observaciones !== undefined) {
      fields.push('OBSERVACIONES = $' + (values.length + 1));
      values.push(req.body.observaciones);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No se proporcionaron campos para actualizar' });
    }

    values.push(documentoidentidad);

    const queryUpdate = `
        UPDATE clientes SET
          ${fields.join(', ')}
        WHERE documentoidentidad = $${values.length}
      `;

    await pool.query(queryUpdate, values);

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
    const query = 'DELETE FROM clientes WHERE documentoidentidad = $1';
    await pool.query(query, [documentoidentidad]);
    res.status(200).json({ message: 'Cliente eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar cliente:', err);
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
});
app.put('/clientes/:documentoidentidad', async (req, res) => {
  const { documentoidentidad } = req.params;

  try {
    const queryGet = 'SELECT * FROM clientes WHERE documentoidentidad = $1';
    const result = await pool.query(queryGet, [documentoidentidad]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

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

    // Validaci�n de datos obligatorios
    if (!documentoidentidad || !nombrecompleto || !correo || !tipocliente || !ciudad || !direccion || !telefonoaseguradora || !aseguradora || !tiposeguro || !fechainicio) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const queryUpdate = `
        UPDATE clientes SET
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
        WHERE documentoidentidad = $20
      `;

    await pool.query(queryUpdate, [
      nombrecompleto, correo, tipocliente, ciudad, direccion, telefonoaseguradora, aseguradora, tiposeguro, producto, poliza, parseFloat(deducible), fechainicio, fechainiciovigencia, fechavencimientopoliza, tipo, status, causacancelacion, fechacancelacion, observaciones, documentoidentidad
    ]);

    res.status(200).json({ message: 'Cliente actualizado exitosamente' });
  } catch (err) {
    console.error('Error al actualizar cliente:', err);
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
});
export default app;
