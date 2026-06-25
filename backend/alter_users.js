const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_admin',
});
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return; }
  const queries = [
    "ALTER TABLE users ADD COLUMN dob DATE NULL",
    "ALTER TABLE users ADD COLUMN gender VARCHAR(20) NULL",
  ];
  let done = 0;
  queries.forEach(q => {
    db.query(q, (err) => {
      if (err) {
        if (err.errno === 1060) {
          console.log(`Column already exists: ${q.split('COLUMN ')[1].split(' ')[0]}`);
        } else {
          console.error('Error:', err.sqlMessage);
        }
      } else {
        console.log(`Added: ${q.split('COLUMN ')[1].split(' ')[0]}`);
      }
      done++;
      if (done === queries.length) {
        console.log('Done.');
        db.end();
      }
    });
  });
});
