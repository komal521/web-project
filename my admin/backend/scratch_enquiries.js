const pool = require("./db");

async function checkSchema() {
  try {
    const [columns] = await pool.query("SHOW COLUMNS FROM enquiries");
    console.log("Enquiries columns:", columns.map(c => c.Field));
  } catch (err) {
    console.log("Error:", err.message);
  } finally {
    process.exit();
  }
}

checkSchema();
