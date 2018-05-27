from flask import jsonify, request

from wifirelay import app, db
from wifirelay.models.device import Device
from wifirelay.utils.state_listener import StateListener
from wifirelay.utils.state_listener_registry import StateListenerRegistry

REGISTRY = StateListenerRegistry()

@app.route('/devices', methods=['GET'])
def get_devices():
  return (jsonify([device.serialize for device in Device.query.all()]), 200)

@app.route('/devices/<int:id>', methods=['GET'])
def get_device(id):
  device = Device.query.get(id)
  if device is None:
    return ('Unable to find device %d' % id, 404)
  return (jsonify(device.serialize), 200)

@app.route('/devices/<int:id>/state', methods=['GET'])
def get_device_state(id):
  device = Device.query.get(id)
  if device is None:
    return ('Unable to find device %d' % id, 404)
  
  try:    
    input_state = int(request.args.get('state'))
  except:
    return (str(int(device.active)), 200)

  state = StateListener(id, input_state).listen()
  return (str(state), 200)

@app.route('/devices', methods=['POST'])
def create_device():
  device_egg = request.json
  device = Device(**device_egg)
  db.session.add(device)
  db.session.commit()
  return (jsonify(device.serialize), 200)

@app.route('/devices/<int:id>/state', methods=['PUT'])
def update_device(id):
  device = Device.query.get(id)
  if device is None:
    return ('Unable to find device %d' % id, 404)

  input_state = bool(int(request.args.get('state', not device.active)))

  device.active = input_state
  db.session.commit()
  REGISTRY.trigger(device.id, int(device.active))
  return (jsonify(device.serialize), 200)

@app.route('/devices/<int:id>', methods=['DELETE'])
def delete_device(id):
  device = Device.query.get(id)
  if device is None:
    return ('Unable to find device %d' % id, 404)
  db.session.delete(device)
  db.session.commit()
  return ('', 204)
