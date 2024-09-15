from ursina import *
from ursina.networking import *

app = Ursina(title="fire in da hole", icon="fith.ico")

window.borderless = True
window.exit_button.enable()
window.fps_counter.disable()
window.entity_counter.disable()
window.collider_counter.disable()

rpcpeer = RPCPeer()

@rpc(rpcpeer)
def on_connect(cn, time):
    print("connection added or smh")

@rpc(rpcpeer)
def on_disconnect(cn, time):
    print("connection removed or smh")

@rpc(rpcpeer)
def say(cn, time, txt):
    print(txt)

def update():
    rpcpeer.update()
    if 
    

app.run()