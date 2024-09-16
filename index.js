import { Peer } from "peerjs.js"

var peer = new Peer(port=135)
selfid = -1

lobotomy = 0

peer.on("open", function(id) {
    selfid = id
})

peer.on("connection", function(conn) {
    conn.on("data", function(data) {
        document.getElementById("2").value = data.toString()
    })
})

function gamehost() {
    document.getElementsByName("mainmenu").style.display = "none"
    peer.connect(selfid)
}

function gamejoin() {
    document.getElementsByName("mainmenu").style.display = "none"
    peer.connect(document.getElementById("dapeerid").value)
}

function get_lobotomy() {
    lobotomy += 1
    conn.send(lobotomy)
    document.getElementById("1").value = lobotomy.toString()
}