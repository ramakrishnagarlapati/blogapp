//import necessary modules for use
const express = require("express");
const bodyParser = require("body-parser");

//create an express instance
const app = express();

app.use(bodyParser.json()); //Parse incoming JSON request bodies

//import the routers for use
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

// Use routers
app.use("/", postsRouter); // Route for posts
app.use("/", commentsRouter); //Route for comments

//define the port
const port = 4000;

//start the server and listen on the specified port
app.listen(port, () => console.log(`Server running on port ${port}`));
