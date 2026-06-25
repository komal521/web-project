
const express = require('express');
const router = express.Router();
const pool = require('../db');
const ensureBrandsTable = async () => {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS brands (
      id INT AUTO_INCREMENT PRIMARY KEY,
      brand_name VARCHAR(150) NOT NULL UNIQUE,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};
router.get('/', async (req, res) => {
  try {
    await ensureBrandsTable();
    const [brands] = await pool.execute('SELECT * FROM brands ORDER BY id DESC');
    res.json({ success: true, brands });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch brands' });
  }
});
router.post('/', async (req, res) => {
  try {
    await ensureBrandsTable();
    const { brandName, description } = req.body;
    if (!brandName) {
      return res.status(400).json({ success: false, message: 'brandName is required' });
    }
    const [result] = await pool.execute(
      'INSERT INTO brands (brand_name, description) VALUES (?, ?)',
      [brandName, description || '']
    );
    res.json({ success: true, brandId: result.insertId, message: 'Brand created' });
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'Brand already exists' });
    }
    res.status(500).json({ success: false, message: 'Failed to create brand' });
  }
});
router.put('/:id', async (req, res) => {
  try {
    await ensureBrandsTable();
    const { id } = req.params;
    const { brandName, description } = req.body;
    const [result] = await pool.execute(
      'UPDATE brands SET brand_name = ?, description = ? WHERE id = ?',
      [brandName, description || '', id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    res.json({ success: true, message: 'Brand updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to update brand' });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    await ensureBrandsTable();
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM brands WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    res.json({ success: true, message: 'Brand deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to delete brand' });
  }
});

module.exports = router;
