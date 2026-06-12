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
  } = req.body;
  const profileImage = req.file ? req.file.filename : null;
  const sql = `
    INSERT INTO users
    (
      full_name,
      username,
      email,
      phone,
      gender,
      dob,
      password,
      profile_image
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [fullName, username, email, phone, gender, dob, password, profileImage],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Registration Failed",
        });
      }
      res.status(201).json({
        success: true,
        message: "Registration Successful",
      });
    }
  );
});
app.get("/api/users", (req, res) => {
  const sql = "SELECT * FROM users ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Users fetch error:", err);
      return res.status(500).json({
        success: false,
        message: "Users fetch failed",
      });
    }
    const users = results.map((u) => ({
      id: u.id,
      fullName: u.full_name,
      username: u.username,
      email: u.email,
      phone: u.phone,
      gender: u.gender,
      dob: u.dob,
      profileImage: u.profile_image,
      status: u.status || "Active",
      createdAt: u.created_at,
    }));

    res.status(200).json({ success: true, users });
  });
});
app.post("/api/categories", upload.single("image"), (req, res) => {
  const {
    category_name,
    slug,
    parent_category,
    description,
    seo_title,
    seo_description,
    status,
    breadcrumb,
    featured,
    sitemap,
    global_search,
  } = req.body;
  const image = req.file ? req.file.filename : null;
  const isFeatured = featured === 'true';
  const isSitemap = sitemap === 'true';
  const isGlobalSearch = global_search === 'true';
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
      category_name,
      slug,
      parent_category,
      description,
      seo_title,
      seo_description,
      status || "Active",
      breadcrumb,
      isFeatured,
      isSitemap,
      isGlobalSearch,
      image,
    ],
    (err, result) => {
      if (err) {
        console.log("Error inserting category:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to add category",
        });
      }
      res.status(201).json({
        success: true,
        message: "Category added successfully",
      });
    }
  );
});
app.get("/api/categories", (req, res) => {
  const sql = "SELECT * FROM categories ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Categories fetch error:", err);
      return res.status(500).json({
        success: false,
        message: "Categories fetch failed",
      });
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

      return res.status(500).json({
        success: false,
        message: "Delete failed",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  });
});
app.post("/api/products", upload.single("image"), (req, res) => {
  const {
    productName,
    description,
    sku,
    brand,
    category,
    subCategory,
    basePrice,
    discountPrice,
    stockQuantity,
    isActive,
    isFeatured,
    weight,
    length,
    width,
    height,
    baseColor,
    metaTitle,
    metaDescription,
  } = req.body;
  const image = req.file ? req.file.filename : null;
  const isActiveBool = isActive === 'true' || isActive === 'on' || isActive === true;
  const isFeaturedBool = isFeatured === 'true' || isFeatured === 'on' || isFeatured === true;
  const sql = `
    INSERT INTO products (
      product_name, description, sku, brand, category, sub_category,
      base_price, discount_price, stock_quantity, is_active, is_featured,
      weight, length, width, height, base_color, meta_title, meta_description, image
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [
      productName,
      description,
      sku,
      brand,
      category,
      subCategory,
      basePrice || 0,
      discountPrice || 0,
      stockQuantity || 0,
      isActiveBool,
      isFeaturedBool,
      weight || 0,
      length || 0,
      width || 0,
      height || 0,
      baseColor,
      metaTitle,
      metaDescription,
      image,
    ],
    (err, result) => {
      if (err) {
        console.log("Error inserting product:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to add product",
        });
      }
      res.status(201).json({
        success: true,
        message: "Product added successfully",
      });
    }
  );
});
app.get("/api/products", (req, res) => {
  const sql = "SELECT * FROM products ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Products fetch error:", err);
      return res.status(500).json({
        success: false,
        message: "Products fetch failed",
      });
    }
    res.status(200).json({ success: true, products: results });
  });
});
app.put("/api/products/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const {
    productName,
    description,
    sku,
    brand,
    category,
    subCategory,
    basePrice,
    discountPrice,
    stockQuantity,
    isActive,
    isFeatured,
    weight,
    length,
    width,
    height,
    baseColor,
    metaTitle,
    metaDescription,
  } = req.body;
  const image = req.file ? req.file.filename : null;
  const isActiveBool = isActive === 'true' || isActive === 'on' || isActive === true;
  const isFeaturedBool = isFeatured === 'true' || isFeatured === 'on' || isFeatured === true;
  let sql = "";
  let params = [];
  if (image) {
    sql = `
      UPDATE products SET 
        product_name=?, description=?, sku=?, brand=?, category=?, sub_category=?,
        base_price=?, discount_price=?, stock_quantity=?, is_active=?, is_featured=?,
        weight=?, length=?, width=?, height=?, base_color=?, meta_title=?, meta_description=?, image=?
      WHERE id=?
    `;
    params = [
      productName, description, sku, brand, category, subCategory,
      basePrice || 0, discountPrice || 0, stockQuantity || 0, isActiveBool, isFeaturedBool,
      weight || 0, length || 0, width || 0, height || 0, baseColor, metaTitle, metaDescription, image, id
    ];
  } else {
    sql = `
      UPDATE products SET 
        product_name=?, description=?, sku=?, brand=?, category=?, sub_category=?,
        base_price=?, discount_price=?, stock_quantity=?, is_active=?, is_featured=?,
        weight=?, length=?, width=?, height=?, base_color=?, meta_title=?, meta_description=?
      WHERE id=?
    `;
    params = [
      productName, description, sku, brand, category, subCategory,
      basePrice || 0, discountPrice || 0, stockQuantity || 0, isActiveBool, isFeaturedBool,
      weight || 0, length || 0, width || 0, height || 0, baseColor, metaTitle, metaDescription, id
    ];
  }
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log("Error updating product:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update product",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  });
});
app.get("/api/product/cards", (req, res) => {
  const sql = `
    SELECT 
      COUNT(*) as totalProducts,
      SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as activeProducts,
      SUM(CASE WHEN stock_quantity > 0 AND stock_quantity <= 10 THEN 1 ELSE 0 END) as lowStockProducts,
      SUM(CASE WHEN stock_quantity = 0 THEN 1 ELSE 0 END) as outOfStockProducts
    FROM products
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.log("Cards fetch error:", err);
      return res.status(500).json({
        success: false,
        message: "Cards fetch failed",
      });
    }

    const data = results[0] || { totalProducts: 0, activeProducts: 0, lowStockProducts: 0, outOfStockProducts: 0 };
    res.status(200).json(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});