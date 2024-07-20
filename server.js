// server.js
const express = require('express');
const path = require('path');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para obtener clientes
app.get('/api/clientes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clientes');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Ruta para agregar un cliente
app.post('/api/clientes', async (req, res) => {
  try {
    const { nombre, apellido, email } = req.body;
    const newClient = await pool.query(
      'INSERT INTO clientes (nombre, apellido, email) VALUES ($1, $2, $3) RETURNING *',
      [nombre, apellido, email]
    );
    res.json(newClient.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
