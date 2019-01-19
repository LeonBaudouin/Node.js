let express = require("express");
let session = require("express-session");
let bodyParser = require("body-parser");
let path = require("path");

let app = express();
let urlencodeParser = bodyParser.urlencoded({extended: false});

app.set(
  'views',
  path.join(__dirname, './views')
)

.use(session({
  secret: "some key",
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));



app.use(function(req, res, next) {
  if(typeof(req.session.todo) == "undefined") {
    req.session.todo = [];
  }
  next();
})

// Affichage Todo
.get("/todo", function(req, res) {
  res.render("todo.ejs", {value: req.session.todo});
})


// Ajout
.post("/todo/ajouter", urlencodeParser, function(req, res) {
  if(req.body.todo != "") {
    req.session.todo.push(req.body.todo);
  }
  res.redirect("/todo");
})


// Suppression
.get("/todo/supprimer/:index", function(req, res) {
  if(req.params.index != "") {
    let index = req.params.index;
    req.session.todo.splice(index, 1);
  }
  res.redirect("/todo");
})


.get("/todo/json/", function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.send(JSON.stringify(req.session.todo));
})


.use(function(req, res, next){
  res.redirect('/todo');
})

app.listen(8080);