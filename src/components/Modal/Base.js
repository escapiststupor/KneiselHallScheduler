import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Overlay from './components/Overlay';

const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  overflow: hidden;
  outline: 0;
`;

const ModalDialogWrapper = styled.div`
  position: relative;
  z-index: 100;
`;

export default class BaseModal extends Component {
  componentDidMount() {
    window.addEventListener('keyup', this.handleEscapeClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleEscapeClick);
  }

  handleEscapeClick = e => e.keyCode === 27 && this.props.onClose.call(null, e);

  handleClose = e => this.props.onClose.call(null, e);

  render() {
    if (!this.props.isOpen) {
      return null;
    }

    return (
      <Modal>
        <ModalDialogWrapper>{this.props.children}</ModalDialogWrapper>
        {this.props.isOpen && <Overlay onClick={this.handleClose} />}
      </Modal>
    );
  }
}

BaseModal.defaultProps = {
  onClose: () => {},
  isOpen: false,
};

BaseModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
