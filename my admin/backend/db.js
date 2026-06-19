const mysql = require("mysql2");
require("dotenv").config();
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "my_admin",
});
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected Successfully");
  }
});

module.exports = db;