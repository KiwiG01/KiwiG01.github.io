import { io } from "socket.io"
const socket = io()

const wateronthehill = 0
const fireinthehole = 0
const areaconfirmed = 0
const rockontheground = 0
const windfromthelandscape = 0
const airdetected = 0

socket.on("updatePlayers", function(players) {
    
})

document.getElementById("getfire").onclick = get_lobotomy

function get_lobotomy() {
    var rand = Math.floor(Math.random() * 11)+1;
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
    document.getElementById("1").value = (wateronthehill + fireinthehole + areaconfirmed + rockontheground + windfromthelandscape + airdetected).toString()
    console.log((wateronthehill + fireinthehole + areaconfirmed + rockontheground + windfromthelandscape + airdetected).toString())
}