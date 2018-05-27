from threading import Event

from wifirelay.models.device import Device
from wifirelay.utils.state_listener_registry import StateListenerRegistry

TIMOUT_SECONDS = 30

REGISTRY = StateListenerRegistry()

class StateListener():

  def __init__(self, device_id, input_state):
    self.device_id = device_id
    self.input_state = input_state
    self.event = Event()

  def listen(self):
    trigger_state = self.input_state ^ 1
    REGISTRY.register(self, trigger_state)

    device = Device.query.get(self.device_id)
    if self.input_state != device.active:
      return int(device.active)

    if self.event.wait(TIMOUT_SECONDS):
      return trigger_state
    else:
      return self.input_state

