const mysql = require('mysql2');
const connection = mysql.createConnection({host: 'localhost', user: 'root', password: '', database: 'my_admin'});
connection.query('SELECT * FROM categories', (err, results) => {
  console.log(results);
  process.exit();
});
