const db = require("../config/db");
const register = (req, res) => {
  const {
    fullName,
    username,
    email,
    phone,
    gender,
    dob,
    password,
  } = req.body;
  const sql = `
    INSERT INTO users
    (
      full_name,
      username,
      email,
      phone,
      gender,
      dob,
      password
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [
      fullName,
      username,
      email,
      phone,
      gender,
      dob,
      password,
    ],
    (err, result) => {
      if (err) {
        console.log("Register Error:", err);

        return res.status(500).json({
          message: "Registration Failed",
        });
      }
      res.status(201).json({
        message: "Registration Successful",
      });
    }
  );
};
module.exports = { register };