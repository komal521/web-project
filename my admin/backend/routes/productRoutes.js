const express = require("express");
const router = express.Router();
const pool = require("../db");
const ensureProductsTable = async () => {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_name VARCHAR(150) NOT NULL,
      description TEXT,
      sku VARCHAR(100) NOT NULL UNIQUE,
      brand VARCHAR(100),
      category VARCHAR(100),
      sub_category VARCHAR(100),
      base_price DECIMAL(10, 2) DEFAULT 0,
      discount_price DECIMAL(10, 2) DEFAULT 0,
      stock_quantity INT DEFAULT 0,
      is_active TINYINT(1) DEFAULT 1,
      is_featured TINYINT(1) DEFAULT 0,
      weight DECIMAL(10, 2) DEFAULT 0,
      length DECIMAL(10, 2) DEFAULT 0,
      width DECIMAL(10, 2) DEFAULT 0,
      height DECIMAL(10, 2) DEFAULT 0,
      base_color VARCHAR(100),
      tags JSON,
      variants JSON,
      meta_title VARCHAR(255),
      meta_description TEXT,
      images JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};
router.get("/", async (req, res) => {
  try {
    await ensureProductsTable();
    const [products] = await pool.execute(`
      SELECT *
      FROM products
      ORDER BY id DESC
    `);
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Products load nahi ho paaye",
      error: error.message,
    });
  }
});
router.post("/create-product", async (req, res) => {
  try {
    await ensureProductsTable();
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
      tags,
      variants,
      metaTitle,
      metaDescription,
      images,
    } = req.body;

    if (!productName || !sku || !brand || !category || !basePrice) {
      return res.status(400).json({
        success: false,
        message:
          "Product name, SKU, brand, category aur base price required hai",
      });
    }
    const [result] = await pool.execute(
      `
      INSERT INTO products (
        product_name,
        description,
        sku,
        brand,
        category,
        sub_category,
        base_price,
        discount_price,
        stock_quantity,
        is_active,
        is_featured,
        weight,
        length,
        width,
        height,
        base_color,
        tags,
        variants,
        meta_title,
        meta_description,
        images
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        productName,
        description || "",
        sku,
        brand,
        category,
        subCategory || "",
        Number(basePrice || 0),
        Number(discountPrice || 0),
        Number(stockQuantity || 0),
        isActive ? 1 : 0,
        isFeatured ? 1 : 0,
        Number(weight || 0),
        Number(length || 0),
        Number(width || 0),
        Number(height || 0),
        baseColor || "",
        JSON.stringify(tags || []),
        JSON.stringify(variants || []),
        metaTitle || "",
        metaDescription || "",
        JSON.stringify(images || []),
      ]
    );
    res.json({
      success: true,
      message: "Product Created Successfully",
      productId: result.insertId,
    });
  } catch (error) {
    console.log(error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "This SKU already exists",
      });
    }
    res.status(500).json({
      success: false,
      message: "Product create nahi hua",
      error: error.message,
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      "DELETE FROM products WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Delete failed",
      error: error.message,
    });
  }
});

module.exports = router;