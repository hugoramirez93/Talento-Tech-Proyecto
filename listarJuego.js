const { Client } = require('pg');

const client = new Client({
  user: 'postgres',          // tu usuario de postgres
  host: 'localhost',         // o 127.0.0.1
  database: 'Accounts',      // el nombre de tu base de datos
  password: 'Melissa2023*', // tu contraseña real
  port: 5432,
});

client.connect()
  .then(() => {
    return client.query('SELECT * FROM "Juegos"');
  })
  .then(result => {
    console.log('Listado de juegos:');
    result.rows.forEach(juego => {
      console.log(`${juego.id} - ${juego.titulo} (${juego.genero}) - Lanzado en ${juego.fecha_lanzamiento}`);
    });
    client.end();
  })
  
  .catch(err => {
    console.error('Error de conexión o consulta:', err.stack);
    client.end();
  });
