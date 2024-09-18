const express = require("express")
const app = express()

const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 })

const port = 6969

plrcount = 0

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

    socket.on("disconnect", function(reason) {
        delete players[socket.id]
        plrcount -= 1
        console.log(plrcount)
        io.emit("updatePlayers", players)
    })

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

    socket.on("setLobotomy", function(payload) {
        players[socket.id] = payload
        io.emit("updatePlayers", players)
    })

    socket.on("fightLobotomy", function() {
        var plrfromplrs
        for (i in players) {
            if (socket.id in players) {
                if (socket.id != i) {
                    plrfromplrs = i
                }
            }
        }
        plrfromplrs = players[plrfromplrs]
        round += 1
        if (plrfromplrs["mon"] >= 10) {
            io.emit("win", plrfromplrs["key"])
            io.emit("lose", players[socket.id]["key"])
        }
        else if (players[socket.id]["mon"] >= 10) {
            io.emit("lose", plrfromplrs["key"])
            io.emit("win", players[socket.id]["key"])
        }
        else if (plrfromplrs["mon"] == 0) {
            io.emit("lose", plrfromplrs["key"])
            io.emit("win", players[socket.id]["key"])
        }
        else if (players[socket.id]["mon"] == 0) {
            io.emit("win", plrfromplrs["key"])
            io.emit("lose", players[socket.id]["key"])
        }
        console.log(plrfromplrs)
        var plr = strengths[players[socket.id]["lob1"]]
        var otherplr = strengths[plrfromplrs["lob1"]]
        console.log(strengths[players[socket.id]["lob1"]])
        console.log(strengths[plrfromplrs["lob1"]])
        if ((players[socket.id]["lob1"] != "na" && plrfromplrs["lob1"] != "na") || (players[socket.id]["lob1"] != undefined && plrfromplrs["lob1"] != undefined)) {
            if (plr < otherplr) {
                console.log("plr1 wins")
                console.log(plrfromplrs["key"])
                io.emit("giveMoners", {"moners": 2, "plr": plrfromplrs["key"]})
            }
            else if (plr > otherplr) {
                console.log("plr2 wins")
                console.log(players[socket.id]["key"])
                io.emit("giveMoners", {"moners": 2, "plr": players[socket.id]["key"]})
            }
            else {
                console.log("no one won")
                io.emit("giveMoners", {"moners": 0, "plr": -1})
            }
        } else {
            console.log("failed to load lobotomy... are you sure that they exist?")
        }
    })
})

server.listen(port, function() {
    console.log("Fire In Da Hole listening at port " + port)
})

console.log("server DID load!")