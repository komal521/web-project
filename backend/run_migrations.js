const db = require("./config/db");
const alterQueries = [
    "ALTER TABLE products ADD COLUMN variants JSON NULL",
    "ALTER TABLE products ADD COLUMN tags JSON NULL"
];
setTimeout(() => {
    let completed = 0;
    alterQueries.forEach(query => {
        db.query(query, (err) => {
            if (err) {
                console.log("Error or already exists:", err.message);
            } else {
                console.log("Column added successfully.");
            }
            completed++;
            if (completed === alterQueries.length) {
                console.log("Migration finished.");
                process.exit(0);
            }
        });
    });
}, 2000);
