const db = require("./config/db");
setTimeout(() => {
    db.query("SELECT id, product_name, variants, tags FROM products ORDER BY id DESC LIMIT 5", (err, res) => {
        if(err) console.error(err);
        else console.log(res);
        process.exit(0);
    });
}, 1500);
