let express = require("express");
let session = require("express-session");
let bodyParser = require("body-parser");

let app = express();
let urlencodeParser = bodyParser.urlencoded({extended: false});

app.use(session({
  secret: "some key",
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));

app
.use(function(req, res, next) {
  if(typeof(req.session.todo) == "undefined") {
    req.session.todo = [];
  }
  console.log(req.session.todo);
  next();
})
.get("/todo", function(req, res) {
  res.render("todo.ejs", {value: req.session.todo});
})
.post("/todo/ajouter/", urlencodeParser, function(req, res) {
  req.session.todo.push(req.body.todo);
  res.redirect("/todo");
})

app.listen(8080);