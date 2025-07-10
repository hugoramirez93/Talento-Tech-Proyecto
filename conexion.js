const { Client } = require('pg');

// Configura estos valores con los de tu instalación
const client = new Client({
  user: 'postgres',           // tu usuario de postgres
  host: 'localhost',          // o el host donde tienes la base de datos
  database: 'Accounts',       // nombre de tu base de datos
  password: 'Melissa2023*',  // pon aquí tu contraseña de postgres
  port: 5432,                 // puerto por defecto de PostgreSQL
});

client.connect()
  .then(() => {
    console.log('¡Conectado a PostgreSQL!');
    return client.query('SELECT * FROM "Usuarios"'); // Consulta de prueba (ajusta el nombre si tu tabla se llama distinto)
  })
  .then(result => {
    console.log('Filas:', result.rows);
    client.end();
  })
  .catch(err => {
    console.error('Error de conexión o consulta:', err.stack);
    client.end();
  });
