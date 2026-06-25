const db = require("./config/db");

setTimeout(() => {
    const variants = '[{"name":"b","colour":"yellow","size":"32","price":"+₹433"}]';
    const tags = '[]';

    const sql = `
    INSERT INTO products (
      product_name, description, sku, brand, category, sub_category,
      base_price, discount_price, stock_quantity, is_active, is_featured,
      weight, length, width, height, base_color, meta_title, meta_description, image,
      variants, tags
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;

    db.query(
        sql,
        [
            "test_prod", "desc", "sku", "brand", "Service", "sub",
            100, 0, 10, true, false,
            0, 0, 0, 0, "red", "meta", "meta desc", null,
            variants, tags
        ],
        (err, result) => {
            if (err) {
                console.error("Insert failed:", err);
            } else {
                console.log("Insert success:", result);
            }
            process.exit(0);
        }
    );
}, 1000);
