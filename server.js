const express = require("express")
const app = express()

const http = require("http")
const { stringify } = require("querystring")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 })

const port = 6969

app.use(express.static(__dirname))

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/index.html")
})

const players = {}

io.on("connection", function(socket) {
    console.log("connection init")

    players[socket.id] = {
        woth: 0,
        fith: 0,
        ac: 0,
        rotg: 0,
        wftl: 0,
        ad: 0,
        total: 0
    }

    console.log(players)

    io.emit("updatePlayers", players)

    socket.on("disconnect", function(reason) {
        delete players[socket.id]
        io.emit("updatePlayers", players)
    })

    socket.on("setLobotomy", function(payload) {
        players[socket.id] = payload
        io.emit("updatePlayers", players)
    })
})

server.listen(port, function() {
    console.log("Example app listening at port " + port)
})

console.log("server DID load!")