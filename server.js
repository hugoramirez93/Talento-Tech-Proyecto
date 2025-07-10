// Carga las librerías necesarias

const express = require ('express');
const cors = require ('cors');
const { Client } = require ('pg');

// Crea la aplicación Express
const app = express();

// Permite peticiones de otros origenes (como el navegador)
app.use(cors());

// Permite peticiones con JSON
app.use(express.json());

// Datos para conectarte a la base de datos ( ajusta tu contraseña si es diferente)
const client = new Client ({
    user: 'postgres',
    host: 'localhost',
    database: 'Accounts',
    password: 'Melissa2023*',
    port: 5432,
});

// Abre la conexión con PostgreSQL
client.connect();

// Crea una ruta para obtener todos los juegos
app.get('/api/juegos', async (req, res) => {
    try {
        // Hace la consulta en la base de datos
        const result = await client.query('SELECT * FROM "Juegos"');
        // Devuelve los juegos al navegador en formato JSON
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Ruta para agregar juegos
app.post('/api/juegos', async (req, res) => {
  console.log(req.body);
  const { titulo, genero, fecha_lanzamiento, descripcion, imagen_url, url_descarga } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO "Juegos" (titulo, genero, fecha_lanzamiento, descripcion, imagen_url, url_descarga) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [titulo, genero, fecha_lanzamiento, descripcion, imagen_url, url_descarga]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/juegos/:id', async (req, res) => {
  const id = req.params.id;
  const { titulo, genero, fecha_lanzamiento, descripcion, imagen_url, url_descarga } = req.body;
  try {
    const result = await client.query(
      'UPDATE "Juegos" SET titulo=$1, genero=$2, descripcion=$3, imagen_url=$4, url_descarga=$5 WHERE id=$6 RETURNING *',
      [titulo, genero, descripcion, imagen_url, url_descarga, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para eliminar juegos
app.delete('/api/juegos/:id', async (req, res) => {
    const id = req.params.id;
    try {
      await client.query('DELETE FROM "Juegos" WHERE id = $1', [id]);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Haz que el servidor escuche el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});