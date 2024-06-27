const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

//express app
const app = express();

//connect to mongodb
const dbURI =
  "mongodb+srv://netninja:test1234@cluster0.xyrls2k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(dbURI)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));
//register view rngine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));

//listen for requests
app.listen(3000);

app.use((req, res, next) => {
  console.log("new request made:");
  console.log("host: ", req.hostname);
  console.log("path: ", req.path);
  console.log("method: ", req.method);
  next();
});

app.use((req, res, next) => {
  console.log("in the next middleware");
  next();
});

app.use(morgan("dev"));

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "create a new blog" });
});

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
