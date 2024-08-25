// Import express module for use
const express = require("express");

// Create a router instance for handling routes
const router = express.Router();
const db = require("../database");

router.post("/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  db.run(
    "INSERT INTO comments (post_id, content) VALUES (?, ?)",
    [postId, content],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

router.get("/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;

  db.all("SELECT * FROM comments WHERE post_id = ?", [postId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ comments: rows });
  });
});

module.exports = router;
