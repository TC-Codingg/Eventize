const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  try {
    const { Nombre, Apellido, DNI, ID_Evento } = req.body;
    await pool.query('INSERT INTO "Invitados" ("Nombre", "Apellido", "DNI", "ID_Evento") VALUES ($1, $2, $3, $4);', [Nombre, Apellido, DNI, ID_Evento]);
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};