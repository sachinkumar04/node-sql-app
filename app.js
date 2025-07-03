require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const app = express();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: { encrypt:true },
};

app.get('/', (_, res) => res.send('Hello from Node.js!'));
app.get('/users', async (_, res) => {
  await sql.connect(config);
  const result = await sql.query`SELECT TOP 10 name, email FROM Users`;
  res.json(result.recordset);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));

