const express = require("express")
const app = express()

const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 })

const port = 6969

round = 1

app.use(express.static(__dirname))

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/index.html")
})

const players = {}
const strengths = {"easy": 1,
    "normal": 2, "hard": 3, "harder": 
    5, "insane": 6, "auto": 8}

io.on("connection", function(socket) {
    console.log("connection init")

    players[socket.id] = {
        lob1: "na",
        mon: 0,
        invmon: 0,
        fight: false
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

    socket.on("fightLobotomy", function() {
        var plrfromplrs
        for (i in Object.keys(players)) {
            if (Object.keys(players)[i] != socket.id) {
                plrfromplrs = Object.keys(players)[i]
            }
        }
        plrfromplrs = players[plrfromplrs]
        round += 1
        if (round == 5) {
            if (plrfromplrs["mon"] > players[socket.id]["mon"]) {
                io.emit("gameFinished", plrfromplrs)
            }
            if (plrfromplrs["mon"] < players[socket.id]["mon"]) {
                io.emit("gameFinished", players[socket.id])
            }
            if (plrfromplrs["mon"] == players[socket.id]["mon"]) {
                io.emit("gameFinished", "na")
            }
        }
        var plr = strengths[players[socket.id]["lob1"]]
        var otherplr = strengths[plrfromplrs["lob1"]]
        console.log(strengths[players[socket.id]["lob1"]])
        console.log(strengths[plrfromplrs["lob1"]])
        if (plr < otherplr) {
            console.log("plr1 wins")
            io.emit("giveMoners", {"moners": 2, "plr": plrfromplrs})
        }
        if (plr > otherplr) {
            console.log("plr2 wins")
            io.emit("giveMoners", {"moners": 2, "plr": socket.id})
        }
        if (plr == otherplr) {
            console.log("no one won")
            io.emit("giveMoners", {"moners": 0, "plr": 0})
        }
    })
})

server.listen(port, function() {
    console.log("Example app listening at port " + port)
})

console.log("server DID load!")