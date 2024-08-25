//import necessary modules for use
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//create an express instance
const app = express();

app.use(cors());
app.use(bodyParser.json()); //Parse incoming JSON request bodies

//import the router for use
const postsRouter = require("./routes/posts");
app.use("/", postsRouter);

//define the port
const port = 4000;

//start the server and listen on the specified port
app.listen(port, () => console.log(`Server running on port ${port}`));
