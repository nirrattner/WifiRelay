import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

import SwitchboardRow from './SwitchboardRow';

import '../../css/switchboard.css';

class Switchboard extends Component {
  render() {
    const { devices, enabled, onDeviceToggle } = this.props;
    return (
      <ListGroup className="switchboard">
        {devices.map(device => (
          <SwitchboardRow 
            key={device.id}
            device={device}
            enabled={enabled}
            onDeviceToggle={onDeviceToggle}
          />
        ))}
      </ListGroup>
    );
  }
}

export default Switchboard;
