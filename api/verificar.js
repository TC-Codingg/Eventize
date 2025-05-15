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
    const { username, password } = req.body;
    const result = await pool.query('SELECT "Usuario", "Contraseña" FROM "Usuarios"');
    const user = result.rows.find(u => u.Usuario === username && u.Contraseña === password);
    if (user) return res.json({ verificado: true });
    res.status(503).json({ verificado: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};