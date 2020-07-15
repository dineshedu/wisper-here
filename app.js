//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
//looks for the files in the public folder
app.use(express.static("public"));
//to use body parser
app.use(bodyParser.urlencoded({ extended: true }));
//to set ejs files
app.set("view engine", "ejs");

//to connect to database
mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//new schema
const userSchema = {
  email: String,
  password: String,
};
//model for new schema
const User = mongoose.model("User", userSchema);

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  //   email = req.body.username;
  //   password = req.bodu.password;
  const newUser = new User({
    email: req.body.username,
    password: req.body.password,
  });
  newUser.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.render("secrets");
    }
  });
});

app.post("/login", function (req, res) {});

app.listen(3000, function () {
  console.log("server started at port");
});
