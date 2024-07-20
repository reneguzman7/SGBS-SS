// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'tu_usuario',
  host: 'tu_host',
  database: 'tu_base_de_datos',
  password: 'tu_contraseña',
  port: 5432,
});

module.exports = pool;
