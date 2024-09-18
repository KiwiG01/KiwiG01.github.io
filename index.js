const socket = io()

players = {}

firstlob = "na"
moners = 2
investedMoners = 0
otherInvestedMoners = 0

fight = false
otherFight = false

otherKey = -1
myKey = -1

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

socket.on("updatePlayers", function(bplayers) {
    players = bplayers
    for (var i in players) {
        if (i != socket.id) {
        document.getElementById("1o").src = players[i]["lob1"] + ".png"
        document.getElementById("2o").src = players[i]["lob1"] + ".png"
        document.getElementById("3o").src = players[i]["lob1"] + ".png"
        otherFight = players[i]["fight"]
        otherInvestedMoners = players[i]["invmon"]
        otherKey = players[i]["key"]
        } else {
            myKey = players[i]["key"]
        }
    }
})

socket.on("giveMoners", function(payload) {
    fight = false
    reset_faces()
    console.log(payload["plr"])
    if (payload["plr"] == myKey) {
        moners += payload["moners"]
        investedMoners = 0
    }
    document.getElementById("moners").textContent = "you got " + moners + " moners"
    socket.emit("setLobotomy", {
        key: myKey,
        lob1: firstlob,
        mon: moners,
        invmon: investedMoners,
        fight: fight
    })
})

socket.on("win", function(who) {
    console.log(who)
    if (players[who]["key"] == otherKey) {
        alert("You won!1!")
    } else {
        alert("This is an error. Reset the page please.")
    }
    location.reload()
})

socket.on("lose", function(who) {
    console.log(who)
    if (players[who]["key"] == otherKey) {
        alert("You lost :((( 😢😢😡😡😡")
    } else {
        alert("This is an error. Reset the page please.")
    }
    location.reload()
})

function fight_lobotomy() {
    fight = true
    socket.emit("setLobotomy", {
        key: myKey,
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

    console.log(myKey)

    socket.emit("setLobotomy", {
        key: myKey,
        lob1: firstlob,
        mon: moners,
        invmon: investedMoners,
        fight: fight
    })
}