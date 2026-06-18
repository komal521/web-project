const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const db = require("./config/db");
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});
app.post("/api/auth/register", upload.single("profileImage"), (req, res) => {
  const {
    fullName,
    username,
    email,
    phone,
    gender,
    dob,
    password,
    confirmPassword,
  } = req.body;
  const profileImage = req.file ? req.file.filename : null;
  const errors = {};
  if (!fullName || fullName.trim() === "") errors.fullName = "Full name is required.";
  if (!username || username.trim() === "") errors.username = "Username is required.";
  if (!email || email.trim() === "") {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email format.";
  }
  if (!phone || phone.trim() === "") {
    errors.phone = "Phone number is required.";
  } else if (!/^\+?[\d\s\-]{7,15}$/.test(phone.trim())) {
    errors.phone = "Invalid phone number.";
  }
  if (!gender || gender.trim() === "") errors.gender = "Gender is required.";
  if (!dob || dob.trim() === "") errors.dob = "Date of birth is required.";
  if (!password || password.trim() === "") {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }
  if (!confirmPassword || confirmPassword.trim() === "") {
    errors.confirmPassword = "Please confirm your password.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  const sql = `
    INSERT INTO users
    (full_name, username, email, phone, gender, dob, password, profile_image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [fullName, username, email, phone, gender, dob, password, profileImage],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          if (err.message.includes("username")) {
            return res.status(400).json({ success: false, errors: { username: "Username already taken." } });
          }
          if (err.message.includes("email")) {
            return res.status(400).json({ success: false, errors: { email: "Email already registered." } });
          }
        }
        console.log(err);
        return res.status(500).json({ success: false, message: "Registration Failed" });
      }
      res.status(201).json({
        success: true,
        message: "Registration Successful",
        user: {
          id: result.insertId,
          fullName,
          username,
          email,
          phone,
          gender,
          dob,
          profileImage: profileImage ? `http://localhost:5000/uploads/${profileImage}` : null,
        },
      });
    }
  );
});
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Login Failed" });
    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    const user = results[0];
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        id: user.id,
        fullName: user.full_name,
        username: user.username,
        email: user.email,
        profileImage: user.profile_image ? `http://localhost:5000/uploads/${user.profile_image}` : null,
      }
    });
  });
});
app.get("/api/users", (req, res) => {
  const sql = "SELECT * FROM users ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Users fetch error:", err);
      return res.status(500).json({ success: false, message: "Users fetch failed" });
    }
    const users = results.map((u) => ({
      id: u.id,
      fullName: u.full_name,
      username: u.username,
      email: u.email,
      phone: u.phone,
      department: u.department,
      role: u.role,
      address: u.address,
      gender: u.gender,
      dob: u.dob,
      profileImage: u.profile_image,
      status: u.status || "Active",
      createdAt: u.created_at,
    }));
    res.status(200).json({ success: true, users });
  });
});
app.post("/api/users/create-user", (req, res) => {
  const { fullName, email, phone, department, role, status, password, address } = req.body;
  const sql = `
    INSERT INTO users (full_name, username, email, phone, department, role, status, password, address)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) `;
  db.query(sql, [fullName, email, email, phone, department, role, status || "Active", password, address], (err, result) => {
    if (err) {
      console.log("Error creating user:", err);
      return res.status(500).json({ success: false, message: "Failed to create user" });
    }
    res.status(201).json({ success: true, message: "User created successfully" });
  });
});
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { fullName, email, phone, department, role, status, address } = req.body;
  const sql = `
    UPDATE users SET 
      full_name=?, email=?, phone=?, department=?, role=?, status=?, address=?
    WHERE id=?`;
  db.query(sql, [fullName, email, phone, department, role, status, address, id], (err, result) => {
    if (err) {
      console.log("Error updating user:", err);
      return res.status(500).json({ success: false, message: "Failed to update user" });
    }
    res.status(200).json({ success: true, message: "User updated successfully" });
  });
});
app.put("/api/users/profile/:id", (req, res) => {
  const { id } = req.params;
  const { fullName, email, phone, address } = req.body;
  const sql = `
    UPDATE users SET 
      full_name=?, email=?, phone=?, address=?
    WHERE id=? `;
  db.query(sql, [fullName, email, phone, address, id], (err, result) => {
    if (err) {
      console.log("Error updating profile:", err);
      return res.status(500).json({ success: false, message: "Failed to update profile" });
    }
    res.status(200).json({ success: true, message: "Profile updated successfully" });
  });
});
app.put("/api/users/password/:id", (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  if (!password || password.length < 6) return res.status(400).json({ success: false, message: "Invalid password" });
  const sql = "UPDATE users SET password=? WHERE id=?";
  db.query(sql, [password, id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "Failed to update password" });
    res.status(200).json({ success: true, message: "Password updated successfully" });
  });
});
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("User delete error:", err);
      return res.status(500).json({ success: false, message: "Delete failed" });
    }
    res.status(200).json({ success: true, message: "User deleted successfully" });
  });
});
app.post("/api/categories", upload.single("image"), (req, res) => {
  const {
    category_name, slug, parent_category, description,
    seo_title, seo_description, status, breadcrumb,
    featured, sitemap, global_search,
  } = req.body;
  const image = req.file ? req.file.filename : null;
  const isFeatured = featured === "true";
  const isSitemap = sitemap === "true";
  const isGlobalSearch = global_search === "true";
  const sql = `
    INSERT INTO categories (
      category_name, slug, parent_category, description,
      seo_title, seo_description, status, breadcrumb,
      featured, sitemap, global_search, image
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [
      category_name, slug, parent_category, description,
      seo_title, seo_description, status || "Active", breadcrumb,
      isFeatured, isSitemap, isGlobalSearch, image,
    ],
    (err, result) => {
      if (err) {
        console.log("Error inserting category:", err);
        return res.status(500).json({ success: false, message: "Failed to add category" });
      }
      res.status(201).json({ success: true, message: "Category added successfully" });
    }
  );
});

app.get("/api/categories", (req, res) => {
  const sql = "SELECT * FROM categories ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Categories fetch error:", err);
      return res.status(500).json({ success: false, message: "Categories fetch failed" });
    }
    res.status(200).json({ success: true, categories: results });
  });
});

app.delete("/api/categories/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM categories WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Category delete error:", err);
      return res.status(500).json({ success: false, message: "Delete failed" });
    }
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  });
});
app.get("/api/categories/cards", (req, res) => {
  const sql = `
    SELECT
      COUNT(*) as totalCategories,
      SUM(CASE WHEN status = 'Active' THEN 1 ELSE 0 END) as activeCategories,
      SUM(CASE WHEN status = 'Trending' THEN 1 ELSE 0 END) as trendingNow,
      SUM(CASE WHEN status = 'Hidden' THEN 1 ELSE 0 END) as hiddenItems
    FROM categories `;
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Category cards fetch error:", err);
      return res.status(500).json({ success: false, message: "Cards fetch failed" });
    }
    const data = results[0] || { totalCategories: 0, activeCategories: 0, trendingNow: 0, hiddenItems: 0 };
    res.status(200).json(data);
  });
});
app.post("/api/products", upload.single("image"), (req, res) => {
  const {
    productName, description, sku, brand, category, subCategory,
    basePrice, discountPrice, stockQuantity, isActive, isFeatured,
    weight, length, width, height, baseColor, metaTitle, metaDescription,
  } = req.body;
  const image = req.file ? req.file.filename : null;
  const isActiveBool = isActive === "true" || isActive === "on" || isActive === true;
  const isFeaturedBool = isFeatured === "true" || isFeatured === "on" || isFeatured === true;
  const sql = `
    INSERT INTO products (
      product_name, description, sku, brand, category, sub_category,
      base_price, discount_price, stock_quantity, is_active, is_featured,
      weight, length, width, height, base_color, meta_title, meta_description, image
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;
  db.query(
    sql,
    [
      productName, description, sku, brand, category, subCategory,
      basePrice || 0, discountPrice || 0, stockQuantity || 0, isActiveBool, isFeaturedBool,
      weight || 0, length || 0, width || 0, height || 0, baseColor, metaTitle, metaDescription, image,
    ],
    (err, result) => {
      if (err) {
        console.log("Error inserting product:", err);
        return res.status(500).json({ success: false, message: "Failed to add product" });
      }
      res.status(201).json({ success: true, message: "Product added successfully" });
    }
  );
});
app.get("/api/products", (req, res) => {
  const sql = "SELECT * FROM products ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Products fetch error:", err);
      return res.status(500).json({ success: false, message: "Products fetch failed" });
    }
    res.status(200).json({ success: true, products: results });
  });
});
app.put("/api/products/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const {
    productName, description, sku, brand, category, subCategory,
    basePrice, discountPrice, stockQuantity, isActive, isFeatured,
    weight, length, width, height, baseColor, metaTitle, metaDescription,
  } = req.body;
  const image = req.file ? req.file.filename : null;
  const isActiveBool = isActive === "true" || isActive === "on" || isActive === true;
  const isFeaturedBool = isFeatured === "true" || isFeatured === "on" || isFeatured === true;
  let sql = "";
  let params = [];
  if (image) {
    sql = `
      UPDATE products SET 
        product_name=?, description=?, sku=?, brand=?, category=?, sub_category=?,
        base_price=?, discount_price=?, stock_quantity=?, is_active=?, is_featured=?,
        weight=?, length=?, width=?, height=?, base_color=?, meta_title=?, meta_description=?, image=?
      WHERE id=?`;
    params = [
      productName, description, sku, brand, category, subCategory,
      basePrice || 0, discountPrice || 0, stockQuantity || 0, isActiveBool, isFeaturedBool,
      weight || 0, length || 0, width || 0, height || 0, baseColor, metaTitle, metaDescription, image, id,
    ];
  } else {
    sql = `
      UPDATE products SET 
        product_name=?, description=?, sku=?, brand=?, category=?, sub_category=?,
        base_price=?, discount_price=?, stock_quantity=?, is_active=?, is_featured=?,
        weight=?, length=?, width=?, height=?, base_color=?, meta_title=?, meta_description=?
      WHERE id=?`;
    params = [
      productName, description, sku, brand, category, subCategory,
      basePrice || 0, discountPrice || 0, stockQuantity || 0, isActiveBool, isFeaturedBool,
      weight || 0, length || 0, width || 0, height || 0, baseColor, metaTitle, metaDescription, id,
    ];
  }
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log("Error updating product:", err);
      return res.status(500).json({ success: false, message: "Failed to update product" });
    }
    res.status(200).json({ success: true, message: "Product updated successfully" });
  });
});
app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM products WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Product delete error:", err);
      return res.status(500).json({ success: false, message: "Delete failed" }); }
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  });
});
app.get("/api/product/cards", (req, res) => {
  const sql = `
    SELECT 
      COUNT(*) as totalProducts,
      SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as activeProducts,
      SUM(CASE WHEN stock_quantity > 0 AND stock_quantity <= 10 THEN 1 ELSE 0 END) as lowStockProducts,
      SUM(CASE WHEN stock_quantity = 0 THEN 1 ELSE 0 END) as outOfStockProducts
    FROM products `;
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Cards fetch error:", err);
      return res.status(500).json({ success: false, message: "Cards fetch failed" });
    }
    const data = results[0] || { totalProducts: 0, activeProducts: 0, lowStockProducts: 0, outOfStockProducts: 0 };
    res.status(200).json(data);
  });
});
app.post("/api/enquiries", (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Name, email and message are required." });
  }
  const sql = `
    INSERT INTO enquiries (full_name, email, phone, subject, message, status, priority)
    VALUES (?, ?, ?, ?, ?, 'Pending', 'Medium')
  `;
  db.query(sql, [name, email, phone || "", subject || "", message], (err, result) => {
    if (err) {
      console.log("Enquiry insert error:", err);
      return res.status(500).json({ success: false, message: "Failed to submit enquiry." });
    }
    res.status(201).json({ success: true, message: "Enquiry submitted successfully!" });
  });
});
app.get("/api/enquiries", (req, res) => {
  const sql = "SELECT * FROM enquiries ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Enquiries fetch error:", err);
      return res.status(500).json({ success: false, message: "Enquiries fetch failed" });
    }
    res.status(200).json({ success: true, enquiries: results });
  });
});
app.get("/api/enquiry/cards", (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const sql = `
    SELECT
      COUNT(*) as totalEnquiries,
      SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pendingEnquiries,
      SUM(CASE WHEN status = 'Resolved' AND DATE(created_at) = ? THEN 1 ELSE 0 END) as resolvedToday,
      SUM(CASE WHEN priority = 'High' THEN 1 ELSE 0 END) as highPriority
    FROM enquiries `;
  db.query(sql, [today], (err, results) => {
    if (err) {
      console.log("Enquiry cards fetch error:", err);
      return res.status(500).json({ success: false, message: "Cards fetch failed" });}
    const data = results[0] || { totalEnquiries: 0, pendingEnquiries: 0, resolvedToday: 0, highPriority: 0 };
    res.status(200).json(data);
  });
});
app.patch("/api/enquiries/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sql = "UPDATE enquiries SET status = ? WHERE id = ?";
  db.query(sql, [status, id], (err) => {
    if (err) return res.status(500).json({ success: false, message: "Update failed" });
    res.status(200).json({ success: true, message: "Status updated" });
  });
});
app.post("/api/orders", (req, res) => {
  const { customer_name, email, phone, address, total_amount, items } = req.body;
  if (!customer_name || !email || !total_amount) {
    return res.status(400).json({ success: false, message: "Missing required fields" });}
  const sql = `
    INSERT INTO orders (customer_name, email, phone, address, items, total_amount)
    VALUES (?, ?, ?, ?, ?, ?) `;
  db.query(sql, [customer_name, email, phone, address, items || "", total_amount], (err, result) => {
    if (err) {
      console.log("Order insert error:", err);
      return res.status(500).json({ success: false, message: "Failed to place order" });
    }
    res.status(201).json({ success: true, message: "Order placed successfully" });
  });
});
app.get("/api/orders", (req, res) => {
  const sql = "SELECT * FROM orders ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Orders fetch error:", err);
      return res.status(500).json({ success: false, message: "Orders fetch failed" });
    }
    res.status(200).json({ success: true, orders: results });
  });
});
app.get("/api/order/cards", (req, res) => {
  const sql = `
    SELECT 
      COUNT(*) as totalOrders,
      SUM(CASE WHEN status = 'Pending' OR status IS NULL THEN 1 ELSE 0 END) as pendingOrders,
      SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completedOrders,
      SUM(CASE WHEN status = 'Cancelled' THEN 1 ELSE 0 END) as cancelledOrders
    FROM orders  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Order cards fetch error:", err);
      return res.status(500).json({ success: false, message: "Order cards fetch failed" }); }
    const data = results[0] || { totalOrders: 0, pendingOrders: 0, completedOrders: 0, cancelledOrders: 0 };
    res.status(200).json(data);
  });
});
app.get("/api/report/cards", (req, res) => {
  const data = { totalRevenue: "₹0", totalOrders: 0, activeUsers: 0, monthlyGrowth: "0%" };
  db.query("SELECT SUM(total_amount) as sum FROM orders", (err, result) => {
    if (!err && result[0]) data.totalRevenue = `₹${Number(result[0].sum || 0).toLocaleString("en-IN")}`;
    db.query("SELECT COUNT(*) as count FROM orders", (err, result) => {
      if (!err && result[0]) data.totalOrders = result[0].count;
      db.query("SELECT COUNT(*) as count FROM users WHERE status = 'Active' OR status IS NULL", (err, result) => {
        if (!err && result[0]) data.activeUsers = result[0].count;
        res.status(200).json(data);
      });
    });
  });
});
app.get("/api/support/cards", (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const sql = `
    SELECT
      COUNT(*) as totalTickets,
      SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as openTickets,
      SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as pendingIssues,
      SUM(CASE WHEN status = 'Resolved' AND DATE(created_at) = ? THEN 1 ELSE 0 END) as resolvedToday
    FROM enquiries`;
  db.query(sql, [today], (err, results) => {
    if (err) {
      console.log("Support cards fetch error:", err);
      return res.status(500).json({ success: false, message: "Support cards fetch failed" });
    }
    const d = results[0] || { totalTickets: 0, openTickets: 0, pendingIssues: 0, resolvedToday: 0 };
    res.status(200).json({
      totalTickets: d.totalTickets || 0,
      openTickets: d.openTickets || 0,
      pendingIssues: d.pendingIssues || 0,
      resolvedToday: d.resolvedToday || 0,
      totalTicketsGrowth: "+0%",
      openTicketsGrowth: "+0%",
      pendingIssuesGrowth: "+0%",
      resolvedTodayGrowth: "+0%",
    });
  });
});
app.get("/api/support/tickets", (req, res) => {
  const sql = "SELECT * FROM enquiries ORDER BY id DESC LIMIT 10";
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Support tickets fetch error:", err);
      return res.status(500).json({ success: false, message: "Support tickets fetch failed" });}
    const tickets = results.map(e => ({
      id: e.id,
      name: e.full_name || "Unknown",
      subject: e.subject || "General Inquiry",
      priority: e.priority || "Medium",
      status: e.status || "Pending",
    }));
    res.status(200).json(tickets);
  });
});
app.put("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const { customer_name, email, phone, address, items, total_amount, status } = req.body;
  const sql = `
    UPDATE orders SET 
      customer_name=?, email=?, phone=?, address=?, items=?, total_amount=?, status=?
    WHERE id=?`;
  db.query(sql, [customer_name, email, phone, address, items, total_amount, status || "Pending", id], (err, result) => {
    if (err) {
      console.log("Order update error:", err);
      return res.status(500).json({ success: false, message: "Failed to update order" });
    }
    res.status(200).json({ success: true, message: "Order updated successfully" });
  });
});
app.delete("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM orders WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Order delete error:", err);
      return res.status(500).json({ success: false, message: "Delete failed" });
    }
    res.status(200).json({ success: true, message: "Order deleted successfully" });
  });
});
app.put("/api/enquiries/:id", (req, res) => {
  const { id } = req.params;
  const { subject, message, priority, status } = req.body;
  const sql = `
    UPDATE enquiries SET 
      subject=?, message=?, priority=?, status=?
    WHERE id=?`;
  db.query(sql, [subject, message, priority, status, id], (err, result) => {
    if (err) {
      console.log("Enquiry update error:", err);
      return res.status(500).json({ success: false, message: "Failed to update enquiry" });
    }
    res.status(200).json({ success: true, message: "Enquiry updated successfully" });
  });
});
app.delete("/api/enquiries/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM enquiries WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Enquiry delete error:", err);
      return res.status(500).json({ success: false, message: "Delete failed" });
    }
    res.status(200).json({ success: true, message: "Enquiry deleted successfully" });
  });
});
app.put("/api/categories/:id", (req, res) => {
  const { id } = req.params;
  const { category_name, slug, description, status } = req.body;
  const sql = `
    UPDATE categories SET 
      category_name=?, slug=?, description=?, status=?
    WHERE id=?`;
  db.query(sql, [category_name, slug, description, status, id], (err, result) => {
    if (err) {
      console.log("Category update error:", err);
      return res.status(500).json({ success: false, message: "Failed to update category" });
    }
    res.status(200).json({ success: true, message: "Category updated successfully" });
  });
});
app.get("/api/activities", (req, res) => {
  const activities = [];
  db.query("SELECT customer_name, status, created_at FROM orders ORDER BY id DESC LIMIT 3", (err, orders) => {
    if (!err && orders) {
      orders.forEach(o => {
        activities.push({
          name: o.customer_name,
          text: `placed an order — Status: ${o.status || "Pending"}`,
          time: timeAgo(o.created_at),
          type: "order"
        });
      });
    }
    db.query("SELECT full_name, subject, created_at FROM enquiries ORDER BY id DESC LIMIT 3", (err, enquiries) => {
      if (!err && enquiries) {
        enquiries.forEach(e => {
          activities.push({
            name: e.full_name,
            text: `submitted enquiry: "${e.subject || 'General'}"`,
            time: timeAgo(e.created_at),
            type: "enquiry"
          });
        });
      }
      db.query("SELECT full_name, created_at FROM users ORDER BY id DESC LIMIT 2", (err, users) => {
        if (!err && users) {
          users.forEach(u => {
            activities.push({
              name: u.full_name,
              text: "registered as a new user",
              time: timeAgo(u.created_at),
              type: "user"
            });
          });
        }
        activities.sort((a, b) => new Date(b.rawTime) - new Date(a.rawTime));
        res.status(200).json(activities);
      });
    });
  });
});
function timeAgo(date) {
  if (!date) return "Just now";
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hr ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return past.toLocaleDateString();
}
app.get("/api/settings", (req, res) => {
  const sql = "SELECT * FROM settings";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Failed to fetch settings" });
    const settings = {};
    results.forEach(row => { settings[row.setting_key] = row.setting_value; });
    res.status(200).json({ success: true, settings });
  });
});
app.post("/api/settings", (req, res) => {
  const { settings } = req.body;
  if (!settings || typeof settings !== 'object') {
    return res.status(400).json({ success: false, message: "Invalid settings format" });
  }
  const promises = Object.keys(settings).map((key) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO settings (setting_key, setting_value) 
        VALUES (?, ?) 
        ON DUPLICATE KEY UPDATE setting_value = ?  `;
      db.query(sql, [key, settings[key], settings[key]], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
  Promise.all(promises)
    .then(() => res.status(200).json({ success: true, message: "Settings updated successfully" }))
    .catch((err) => {
      console.log("Settings update error:", err);
      res.status(500).json({ success: false, message: "Failed to update settings" });
    });});
app.get("/api/dashboard/cards", (req, res) => {
  const data = { totalOrders: 0, totalRevenue: 0, totalProducts: 0, activeUsers: 0 };
  db.query("SELECT COUNT(*) as count FROM orders", (err, result) => {
    if (!err && result[0]) data.totalOrders = result[0].count;
    db.query("SELECT SUM(total_amount) as sum FROM orders", (err, result) => {
      if (!err && result[0]) data.totalRevenue = result[0].sum || 0;
      db.query("SELECT COUNT(*) as count FROM products", (err, result) => {
        if (!err && result[0]) data.totalProducts = result[0].count;
        db.query("SELECT COUNT(*) as count FROM users WHERE status = 'Active'", (err, result) => {
          if (!err && result[0]) data.activeUsers = result[0].count;
          res.json(data);
        });
      });
    });
  });
});
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});