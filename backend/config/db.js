const mysql = require("mysql2");
require("dotenv").config();
let db = null;
let isConnected = false;
let retryTimer = null;
function createConnection() {
  if (retryTimer) {
    clearTimeout(retryTimer);
    retryTimer = null;
  }
  db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "my_admin",
    connectTimeout: 10000,
  });
  db.connect((err) => {
    if (err) {
      isConnected = false;
      console.log(`  MySQL not connected (${err.code}) — retrying in 5s...`);
      console.log("   ➤ Please start WAMP and turn on MySQL service");
      scheduleReconnect();
    } else {
      isConnected = true;
      console.log("✅  MySQL Connected Successfully");
    }
  });
  db.on("error", (err) => {
    isConnected = false;
    const retryable = [
      "PROTOCOL_CONNECTION_LOST",
      "ECONNREFUSED",
      "ENOTFOUND",
      "ETIMEDOUT",
      "ECONNRESET",
      "EPIPE",
    ];
    if (retryable.includes(err.code)) {
      console.log(`  MySQL lost connection (${err.code}) — reconnecting...`);
      scheduleReconnect();
    } else {
      console.error("MySQL fatal error:", err);
      throw err;
    }
  });
}

function scheduleReconnect() {
  retryTimer = setTimeout(() => {
    createConnection();
  }, 5000);
}
createConnection();
const dbProxy = {
  query: (sql, params, callback) => {
    if (!isConnected || !db) {
      const errMsg = "Database not connected. Please start WAMP/MySQL.";
      if (typeof params === "function") {
        return params(new Error(errMsg));
      }
      if (typeof callback === "function") {
        return callback(new Error(errMsg));
      }
      return;
    }
    if (typeof params === "function") {
      return db.query(sql, params);
    }
    return db.query(sql, params, callback);
  },
  on: (...args) => db && db.on(...args),
};
module.exports = dbProxy;