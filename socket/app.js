let path = require("path");
let ent = require("ent");
let express = require("express");

let expressSession = require("express-session")({
    secret: "Session secret key",
    resave: true,
    saveUninitialized: true
});

let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);

let sharedSession = require("express-socket.io-session");
io.use(sharedSession(expressSession));

server.listen(8080);


app
.use(expressSession)

.get("/", function(req, res) {
    res.sendFile(path.resolve() + "/socket/index.html");
})


io.on('connection', function (socket) {

    console.log(socket.handshake.session.pseudo);

    if(!socket.handshake.session.isNamed) {
        socket.emit("askPseudo");
    }

    socket.on("pseudo", function(pseudo) {

        socket.handshake.session.pseudo = pseudo;
        socket.handshake.session.isNamed = true;
        socket.handshake.session.save();

        console.log(socket.handshake.session.pseudo + " est connecté");
    })

    socket.on("message", function(message) {
        console.log(socket.handshake.session.pseudo + " vous envoi le message : " + message);
        socket.broadcast.emit("message", socket.handshake.session.pseudo, ent.encode(message));
    })
});
