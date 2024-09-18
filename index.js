const socket = io()

firstlob = "na"
moners = 2
investedMoners = 0
otherInvestedMoners = 0

fight = false
otherFight = false

function reset_faces() {
    firstlob = "na"
    secondlob = "na"
    thirdlob = "na"
    document.getElementById("1p").src = firstlob + ".png"
    document.getElementById("2p").src = secondlob + ".png"
    document.getElementById("3p").src = thirdlob + ".png"
    document.getElementById("1o").src = "na.png"
    document.getElementById("2o").src = "na.png"
    document.getElementById("3o").src = "na.png"
}

socket.on("updatePlayers", function(players) {
    for (var i in players) {
        if (i != socket.id) {
        document.getElementById("1o").src = players[i]["lob1"] + ".png"
        document.getElementById("2o").src = players[i]["lob1"] + ".png"
        document.getElementById("3o").src = players[i]["lob1"] + ".png"
        otherFight = players[i]["fight"]
        otherInvestedMoners = players[i]["invmon"]
        }
    }
})

socket.on("giveMoners", function(payload) {
    fight = false
    console.log(payload["plr"] == socket.id)
    reset_faces()
    if (payload["plr"] == socket.id) {
        moners += payload["moners"]
        investedMoners = 0
    }
    document.getElementById("moners").textContent = "you got " + moners + " moners"
    socket.emit("setLobotomy", {
        lob1: firstlob,
        mon: moners,
        invmon: investedMoners,
        fight: fight
    })
})

socket.on("gameFinished", function(who) {
    if (who == "na") {
        alert("Nobody won!!1")
    } else {
        if (who == socket.id) {
            alert("You won!1!")
        } else {
            alert("You lost :((( 😢😢😡😡😡")
        }
    }
    location.reload()
})

function fight_lobotomy() {
    fight = true
    socket.emit("setLobotomy", {
        lob1: firstlob,
        mon: moners,
        invmon: investedMoners,
        fight: fight
    })
    if (fight && otherFight) {
        socket.emit("fightLobotomy")
    }
}

function get_lobotomy() {
    console.log(firstlob)
    var rand = Math.floor(Math.random() * 11) + 1;
    if (firstlob == "na") {
        if (rand == 1 || rand == 3 || rand == 6) {
            firstlob = "easy"
        }
        if (rand == 2 || rand == 4 || rand == 5) {
            firstlob = "normal"
        }
        if (rand == 7 || rand == 11) {
            firstlob = "hard"
        }
        if (rand == 8) {
            firstlob = "harder"
        }
        if (rand == 9) {
            firstlob = "insane"
        }
        if (rand == 10) {
            firstlob = "auto"
        }
        if (moners > 0) {
            moners -= 1
        }
        investedMoners += 1
    }
    document.getElementById("1p").src = firstlob + ".png"
    document.getElementById("2p").src = firstlob + ".png"
    document.getElementById("3p").src = firstlob + ".png"
    document.getElementById("moners").textContent = "you got " + moners + " moners"

    socket.emit("setLobotomy", {
        lob1: firstlob,
        mon: moners,
        invmon: investedMoners,
        fight: fight
    })
}