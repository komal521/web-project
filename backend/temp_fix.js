const mysql=require('mysql2');
 const db=mysql.createConnection({host:'localhost',user:'root',password:'',database:'my_admin'});
  db.query('ALTER TABLE orders ADD COLUMN customer_name VARCHAR(255), ADD COLUMN email VARCHAR(255), ADD COLUMN phone VARCHAR(20), ADD COLUMN address TEXT, ADD COLUMN total_amount DECIMAL(10,2) DEFAULT 0, ADD COLUMN payment_method VARCHAR(50) DEFAULT \'Online\', ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
     (err)  => { if(err) console.log(err.message); else console.log('Fixed columns!');
     process.exit(); });
