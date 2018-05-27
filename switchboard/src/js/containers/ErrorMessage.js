import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class ErrorMessage extends Component {
  render() {
    const { error, onClearError } = this.props;
    if (!error) {
      return null;
    }
    return (
      <Alert bsStyle="danger" onDismiss={onClearError}>
        { error }
      </Alert>
    );
  }
}

export default ErrorMessage;
