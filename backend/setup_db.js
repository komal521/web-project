const db = require('./config/db');
const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  gender VARCHAR(20),
  dob DATE,
  password VARCHAR(255) NOT NULL,
  profile_image VARCHAR(255),
  department VARCHAR(100),
  role VARCHAR(100),
  address TEXT,
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
const createCategoriesTable = `
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(255) NOT NULL,
  slug VARCHAR(255),
  parent_category VARCHAR(255),
  description TEXT,
  seo_title VARCHAR(255),
  seo_description TEXT,
  status VARCHAR(50) DEFAULT 'Active',
  breadcrumb VARCHAR(255),
  featured BOOLEAN DEFAULT false,
  sitemap BOOLEAN DEFAULT true,
  global_search BOOLEAN DEFAULT true,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
const createProductsTable = `
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  description TEXT,
  sku VARCHAR(100),
  brand VARCHAR(255),
  category VARCHAR(255),
  sub_category VARCHAR(255),
  base_price DECIMAL(10, 2),
  discount_price DECIMAL(10, 2),
  stock_quantity INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  weight DECIMAL(10, 2),
  length DECIMAL(10, 2),
  width DECIMAL(10, 2),
  height DECIMAL(10, 2),
  base_color VARCHAR(100),
  meta_title VARCHAR(255),
  meta_description TEXT,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
const createEnquiriesTable = `
CREATE TABLE IF NOT EXISTS enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT,
  status VARCHAR(50) DEFAULT 'Pending',
  priority VARCHAR(20) DEFAULT 'Medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
const createOrdersTable = `
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  items TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
const createSettingsTable = `
CREATE TABLE IF NOT EXISTS settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
db.query(createUsersTable, (err) => {
  if (err) console.error('Error creating users table:', err);
  else console.log('Users table ready!');
  db.query(createCategoriesTable, (err) => {
    if (err) console.error('Error creating categories table:', err);
    else console.log('Categories table ready!');
    db.query(createProductsTable, (err) => {
      if (err) console.error('Error creating products table:', err);
      else console.log('Products table ready!');
      db.query(createEnquiriesTable, (err) => {
        if (err) console.error('Error creating enquiries table:', err);
        else console.log('Enquiries table ready!');
        db.query(createOrdersTable, (err) => {
          if (err) console.error('Error creating orders table:', err);
          else console.log('Orders table ready!');
          db.query(createSettingsTable, (err) => {
            if (err) console.error('Error creating settings table:', err);
            else console.log('Settings table ready!');
            process.exit();
          });
        });
      });
    });
  });
});
