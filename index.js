const socket = io()

wateronthehill = 0
fireinthehole = 0
areaconfirmed = 0
rockontheground = 0
windfromthelandscape = 0
airdetected = 0
totallobotomies = 0

socket.on("updatePlayers", function(players) {
    for (var i in players) {
        if (i != socket.id) {
            console.log(players[i]["woth"])
            document.getElementById("2").textContent = "the opponent has " + players[i]["total"] + " lobotomies"
        }
    }
})

function get_lobotomy() {
    var rand = Math.floor(Math.random() * 11) + 1;
    if (rand == 1 || rand == 3 || rand == 6) {
        wateronthehill += 1
    }
    if (rand == 2 || rand == 4 || rand == 5) {
        fireinthehole += 1
    }
    if (rand == 7 || rand == 11) {
        areaconfirmed += 1
    }
    if (rand == 8) {
        rockontheground += 1
    }
    if (rand == 9) {
        windfromthelandscape += 1
    }
    if (rand == 10) {
        airdetected += 1
    }
    totallobotomies = (wateronthehill + fireinthehole + areaconfirmed + rockontheground + windfromthelandscape + airdetected)
    document.getElementById("1").textContent = "you have " + totallobotomies + " lobotomies"
    console.log(totallobotomies)
    socket.emit("setLobotomy", {
        woth: wateronthehill, 
        fith: fireinthehole, 
        ac: areaconfirmed, 
        rotg: rockontheground, 
        wftl: windfromthelandscape, 
        ad: airdetected, total: 
        totallobotomies
    })
}