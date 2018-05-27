import React, { Component } from 'react';

import '../../css/loading.css';

class Loading extends Component {
  render() {
    const { loaded } = this.props;
    if (loaded) {
      return null;
    }
    return (
      <span className="loading">Loading...</span>
    );
  }
}

export default Loading;
