const express = require("express")
const app = express()

const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 })

const port = 6969

var plrcount = 0

round = 1

app.use(express.static(__dirname))

app.get("/", function(req, res) {
    if (plrcount < 2) {
        res.sendFile(__dirname+"/index.html")
    } else {
        res.sendFile(__dirname+"/failed/amount.html")
    }
})

const players = {}
const strengths = {"easy": 1,
    "normal": 2, "hard": 3, "harder": 
    5, "insane": 6, "auto": 8}

io.on("connection", function(socket) {
    console.log("connection init")

    players[socket.id] = {
        key: plrcount,
        lob1: "na",
        mon: 0,
        invmon: 0,
        fight: false
    }

    plrcount += 1

    console.log(players)

    io.emit("updatePlayers", players)

    socket.on("disconnect", function(reason) {
        plrcount -= 1
        delete players[socket.id]
        io.emit("updatePlayers", players)
    })

    socket.on("setLobotomy", function(payload) {
        players[socket.id] = payload
        io.emit("updatePlayers", players)
    })

    socket.on("fightLobotomy", function() {
        var plrfromplrs
        for (i in players) {
            if (players[i]["key"] != players[socket.id]["key"]) {
                plrfromplrs = players[i]
                console.log(i)
            }
        }
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
            console.log(plrfromplrs["key"])
            io.emit("giveMoners", {"moners": 2, "plr": plrfromplrs["key"]})
        }
        if (plr > otherplr) {
            console.log("plr2 wins")
            console.log(players[socket.id]["key"])
            io.emit("giveMoners", {"moners": 2, "plr": players[socket.id]["key"]})
        }
        if (plr == otherplr) {
            console.log("no one won")
            io.emit("giveMoners", {"moners": 0, "plr": -1})
        }
    })
})

server.listen(port, function() {
    console.log("Fire In Da Hole listening at port " + port)
})

console.log("server DID load!")