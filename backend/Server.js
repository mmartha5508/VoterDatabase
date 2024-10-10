const con = require('./Connection.js');

const express = require('express');
const cors = require('cors');
const { Pool, Connection } = require('pg');

const app = express();
const port = 5434;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL configuration
const pool = new Pool({
  user: con.user,
  host: con.host,
  database: con.database,
  password: con.password,
  port: con.port,
});

// API to get table names
app.get('/api/tables', async (req, res) => {
  try {
    const tables = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public';
    `);
    res.json(tables.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to get table data
app.get('/api/table/:name', async (req, res) => {
  const tableName = req.params.name;
  try {
    const result = await pool.query(`SELECT * FROM ${tableName} ORDER BY id LIMIT 2000;`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//handling the boolean values
app.patch('/api/table/:name/:id/:column', async (req, res) => {
  const { name, id, column } = req.params;
  const { value } = req.body;
  console.log(`Updating table: ${name}, id: ${id}, column: ${column}`);

  if (!name || !id || !column) {
    return res.status(400).json({ error: 'Invalid parameters. Ensure name, id, and column are provided.' });
  }

  if (typeof value !== 'boolean') {
    return res.status(400).json({ error: 'Invalid value type. Must be boolean.' });
  }

  try {
    //updating the boolean values based on the user
    const query = `UPDATE ${name} SET ${column} = $1 WHERE id = $2`;
    await pool.query(query, [value, id]);
    res.status(200).json({ message: 'Update successful' });
  } catch (err) {
    console.error('Error updating boolean value:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
