const express = require("express");
const router = express.Router();
const db = require("../config/db");
router.get("/", async (req, res) => {
  try {
    const sql = `
      SELECT
        id,
        full_name AS fullName,
        username,
        email,
        phone,
        gender,
        dob
      FROM users
      ORDER BY id DESC
    `;
    const [users] = await db.query(sql);
    const formattedUsers = users.map((user) => ({
      ...user,
      role: "User",
      department: "General",
      status: "Active",
    }));
    res.json({
      users: formattedUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error loading users",
    });
  }
});

module.exports = router;