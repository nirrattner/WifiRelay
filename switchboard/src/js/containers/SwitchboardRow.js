import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import Toggle from 'react-toggle';

import 'react-toggle/style.css';
import '../../css/switchboard-row.css';

class SwitchboardRow extends Component {
  render() {
    const { device, enabled, onDeviceToggle } = this.props;
    return (
      <ListGroupItem className="switchboard-row">
        <span>{device.name}</span>
        <Toggle 
          className="toggle"
          checked={device.active}
          disabled={!enabled}
          onChange={() => onDeviceToggle(device)}
        />
      </ListGroupItem>
    );
  }
}

export default SwitchboardRow;
