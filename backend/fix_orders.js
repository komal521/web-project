const db = require('./config/db');
const sql = `ALTER TABLE orders 
  ADD COLUMN customer_name VARCHAR(255),
  ADD COLUMN email VARCHAR(255),
  ADD COLUMN phone VARCHAR(20),
  ADD COLUMN address TEXT,
  ADD COLUMN total_amount DECIMAL(10,2) DEFAULT 0,
  ADD COLUMN payment_method VARCHAR(50) DEFAULT 'Online',
  ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`;
db.query(sql, (err) => {
  if (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log('Columns already exist, skipping.');
    } else {
      console.log('Error:', err.message);
    }
  } else {
    console.log('Orders table updated successfully!');
  }
  process.exit();
});
