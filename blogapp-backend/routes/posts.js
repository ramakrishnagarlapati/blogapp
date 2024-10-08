//import express module for use
const express = require("express");

//create a router instance for handling routes
const router = express.Router();

const db = require("../database");

//Get all posts
router.get("/posts", (req, res) => {
  db.all("SELECT * FROM posts", [], (err, rows) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    //respond with list of posts
    res.send({ posts: rows });
  });
});

// Get a single post by ID
router.get("/posts/:postId", (req, res) => {
  //destructure the postId from request parameters
  const { postId } = req.params;
  db.get("SELECT * FROM posts WHERE id = ?", [postId], (err, row) => {
    //handle errors that occur during the query
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    //handle in case if post is not found
    if (row === undefined) {
      return res.status(404).send({ message: "Post not found" });
    }
    //respond with specific post
    res.send({ post: row });
  });
});

//Create a new post
router.post("/posts", (req, res) => {
  //destructure the title and content from request body
  const { title, content } = req.body;

  // Check if either title or content is missing or empty
  if (!title || !content) {
    //handle client error for absence of form values
    return res.status(400).send({ error: "Title and content are required." });
  }

  db.run(
    "INSERT INTO posts (title, content) VALUES (?, ?)",
    [title, content],
    function (err) {
      //handle errors that occur during the query
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      //respond with postId of the newly created post
      res.send({ postId: this.lastID });
    }
  );
});

//update a post by ID
router.put("/posts/:postId", (req, res) => {
  //destructure the title and content from request body and postId from request parameters
  const { postId } = req.params;
  const { title, content } = req.body;
  db.run(
    "UPDATE posts SET title = ?, content = ? WHERE id = ?",
    [title, content, postId],
    function (err) {
      //handle errors that occur during the query
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      //handle in case if post is not found
      if (this.changes === 0) {
        return res.status(404).send({ message: "Post not found" });
      }

      //respond with a success message and number of updated rows
      res.send({
        message: "Post Updated Successfully",
      });
    }
  );
});

//delete a post by ID
router.delete("/posts/:postId", (req, res) => {
  //destructure postId from request parameters
  const { postId } = req.params;
  db.run("DELETE FROM posts WHERE id = ?", [postId], function (err) {
    //handle errors that occur during the query
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    //handle in case if post is not found
    if (this.changes === 0) {
      return res.status(404).send({ message: "Post not found" });
    }
    //respond with a success message and number of deleted rows
    res.send({
      message: "Post Deleted Successfully",
    });
  });
});

module.exports = router;
