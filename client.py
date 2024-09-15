from ursina import *
from ursinanetworking import *
from random import randint
import socket

STATE = "main"

client = None

def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.settimeout(0)
    try:
        # doesn't even have to be reachable
        s.connect(('10.254.254.254', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

app = Ursina(title="fire in da hole", icon="fith.ico")

window.borderless = True
window.exit_button.enable()
window.fps_counter.disable()
window.entity_counter.disable()
window.collider_counter.disable()

lobotomies = ["easy","easy","easy", "normal","normal","normal","normal","normal", "hard","hard","hard", "hard","hard","hard","hard","hard","easy","easy","easy", "harder","harder","harder","harder", "insane","insane", "extreme", "auto"]

fith = Audio(sound_file_name="fire-in-the-hole.mp3", autoplay=False)

music = Audio(sound_file_name="ultra firehole song.mp3", volume=0.5, loops=-1, loop=True)
music.play()

def get_lobotomy():
    fith.play()

def gamejoin():
    global client
    STATE = "wait"
    client = UrsinaNetworkingClient(join.text, 8000)

click = Button(icon="button.png", scale=(0.4,0.4), position=(0.6, -0.25))
click.on_click = get_lobotomy
click.disable()

join = Button(text="JOIN GAME WITH IP FROM ABOVE", position=(0.25, 0), scale=(0,0.5))
join._on_click = gamejoin
ip = TextField(max_lines=1)

@client.event
def onConnectionEstablished():
    print("I'm connected to the server !")

@client.event
def onConnectionError(Reason):
    print(f"Error ! Reason : {Reason}")

def update():
    global STATE
    if STATE == "main":
        join.enable()
        ip.enable()
    else:
        join.disable()
        ip.disable()

app.run()