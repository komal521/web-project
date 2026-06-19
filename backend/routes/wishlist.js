router.post("/", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    await db.query(
      "INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)",
      [userId, productId]
    );
    res.json({
      success: true,
      message: "Added to wishlist"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false
    });
  }
});