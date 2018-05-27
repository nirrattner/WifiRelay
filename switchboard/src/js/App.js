import React, { Component } from 'react';

import * as DevicesApi from './api/DevicesApi';
import * as ErrorType from './lib/ErrorType';

import ErrorMessage from './containers/ErrorMessage';
import Loading from './containers/Loading';
import Switchboard from './containers/Switchboard';

import '../css/app.css';

const INTERVAL = 30000;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      devices: [],
      enabled: true,
      loaded: false,
    };
  }

  componentDidMount() {
    this.loadAll();
    setInterval(() => this.loadAll(), INTERVAL);
  }

  loadAll() {
    DevicesApi.getAll()
      .then(response => response.json())
      .then(devices => this.setState({
        devices,
        loaded: true, 
      }))
      .catch(error => {
        this.setState({ 
          error: ErrorType.FETCH_FAILED,
          loaded: true,
        });
        console.log(ErrorType.FETCH_FAILED);
      });
  }

  onClearError() {
    this.setState({ error: '' });
  }

  onDeviceToggle(device) {
    const newState = device.active ? 0 : 1;
    this.setState({ enabled: false });
    DevicesApi.update(device.id, newState)
      .then(response => response.json())
      .then(updatedDevice => {
        const { devices } = this.state;
        const updatedDevices = devices.map(device =>
          device.id === updatedDevice.id
            ? updatedDevice
            : device);
        this.setState({ 
          devices: updatedDevices,
          enabled: true,
        });
      })
      .catch(error => {
        this.setState({ 
          error: ErrorType.UPDATE_FAILED,
          enabled: true,
        });
        console.log(ErrorType.FETCH_FAILED);
      });
  }

  render() {
    const { devices, enabled, error, loaded } = this.state;
    return (
      <div className="app">
        <h1>Switchboard</h1>
        <ErrorMessage 
          error={error} 
          onClearError={() => this.onClearError()} 
        />
        <Loading loaded={loaded} />
        <Switchboard 
          devices={devices} 
          enabled={enabled}
          onDeviceToggle={device => this.onDeviceToggle(device)}
        />
      </div>
    );
  }
}

export default App;
