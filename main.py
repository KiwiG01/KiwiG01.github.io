from ursina import *
from ursina.networking import *

app = Ursina(title="fire in da hole", icon="fith.ico")

window.borderless = True
window.exit_button.enable()
window.fps_counter.disable()
window.entity_counter.disable()
window.collider_counter.disable()

rpcpeer = RPCPeer()

fith = Audio(sound_file_name="fire-in-the-hole.mp3", autoplay=False)

click = Button(icon="button.png", scale=(0.4,0.4), position=(0.6, -0.25))
click.on_click = fith.play

@rpc(rpcpeer)
def on_connect(cn, time):
    print("connection added or smh")

@rpc(rpcpeer)
def on_disconnect(cn, time):
    print("connection removed or smh")

@rpc(rpcpeer)
def say(cn, time, txt:str):
    print(txt)

def update():
    rpcpeer.update()
    

app.run()