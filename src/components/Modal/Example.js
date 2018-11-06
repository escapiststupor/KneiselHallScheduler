import React, { Component } from 'react';
import Button from '../Button';

const withOnClose = (WrappedComponent, onClose) => <WrappedComponent onClose={onClose} />

class Example extends Component {
  state = { isOpen: false };

  handleClose = () => this.setState({ isOpen: false })

  render() {
    const { isOpen } = this.state;
    const { children } = this.props;
    console.log(typeof children)
    return (
      <React.Fragment>
        <Button onClick={() => this.setState({ isOpen: true })}>
          click to open
        </Button>
        {isOpen && withOnClose(children, this.handleClose)}
      </React.Fragment>
    );
  }
}

export default Example;
