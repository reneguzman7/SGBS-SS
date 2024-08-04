const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SGBS-SS',
  password: '123456',
  port: 5432, // Puerto por defecto de PostgreSQL
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Conexión exitosa:', res.rows[0]);
  }
});