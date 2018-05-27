from collections import defaultdict

class StateListenerRegistry():
  
  __instance = None

  def __new__(cls):
    if StateListenerRegistry.__instance is None:
      StateListenerRegistry.__instance = object.__new__(cls)
    StateListenerRegistry.__instance.registry = defaultdict(list)
    return StateListenerRegistry.__instance

  def register(self, state_listener, trigger_state):
    print('register trigger_state', trigger_state)
    self.registry[(state_listener.device_id, trigger_state)].append(state_listener)
  
  def trigger(self, device_id, trigger_state):
    print('trigger trigger_state', trigger_state)
    for state_listener in self.registry[(device_id, trigger_state)]:
      state_listener.event.set()
    del self.registry[(device_id, trigger_state)]
