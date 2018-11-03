/* eslint-disable react/no-did-mount-set-state, react/no-did-update-set-state */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { colors } from '../style-variables';
import Button from '../Button';
import Tooltip from '../Tooltip';
import { Spinner } from 'styled-icons/fa-solid';

const STATUS = {
  INIT: 'INIT',
  EDITING: 'EDITING',
  LOADING: 'LOADING',
};

const Wrap = styled.div`
  position: relative;
  display: inline-block;
  outline: none;
  width: 100%;
  padding: 0;
  margin: 0;

  ${props =>
    props.status === STATUS.INIT &&
    css`
      &:hover {
        background-color: ${colors.border};
        cursor: pointer;
      }
    `};
  ${props =>
    props.status === STATUS.EDITING &&
    css`
      box-shadow: 0 0 0 2px ${colors.black};
    `};

  ${props =>
    props.error &&
    css`
      box-shadow: 0 0 0 2px ${colors.red};
    `};

  ${props =>
    props.status === STATUS.LOADING &&
    css`
      pointer-events: none;
      cursor: not-allowed;
    `};
`;

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

const Actions = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  display: flex;
  transform: translateY(4px);
  cursor: default;
  z-index: 100;

  & > * + * {
    margin-left: 4px;
  }
`;

const Action = styled(Button).attrs({
  minor: true,
})`
  font-size: 12px;
`;

const initialState = {
  status: STATUS.INIT,
  preservedContent: null,
  error: null,
};
class Editable extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.ref = React.createRef();
    this.outerRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      preservedContent: this.currentContent(),
    });
    document.addEventListener('keydown', this.handleKeyDownEvent);
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.key !== this.props.key) {
      this.setState({
        preservedContent: this.currentContent(),
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDownEvent);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  currentContent = () => this.ref.current.innerText;

  handleClickOutside = event => {
    if (this.ref.current && !this.ref.current.contains(event.target)) {
      this.handleCancel();
    }
  };

  handleKeyDownEvent = event => {
    this.setState({ error: null });
    if (event.ctrlKey && event.code === 'Enter') {
      this.handleSubmit();
    }

    if (event.code === 'Escape') {
      this.handleCancel();
    }
  };

  handleEditStart = () => {
    if (this.state.status !== STATUS.INIT) return;
    this.props.onEditStart();
    this.setState(
      () => ({
        status: STATUS.EDITING,
      }),
      () => this.ref.current.focus()
    );
  };

  handleAsyncConfirm = () => {
    this.setState({ status: STATUS.LOADING });
    this.props
      .asyncProcessAfterSubmit(this.currentContent())
      .then(this.handleConfirm)
      .catch(this.handleError);
  };

  handleConfirm = () => {
    this.setState(
      {
        status: STATUS.INIT,
        preservedContent: this.currentContent(),
      },
      () => {
        this.props.onConfirm(this.currentContent());
      }
    );
  };

  handleError = error => {
    this.setState(
      () => ({ status: STATUS.EDITING, error }),
      () => {
        this.ref.current.focus();
        this.props.onError(error);
      }
    );
  };

  handleSubmit = () => {
    const { allowEmpty, asyncProcessAfterSubmit } = this.props;
    if (!allowEmpty && this.currentContent() === '') {
      this.setState({ error: 'empty' });
      return;
    }
    if (asyncProcessAfterSubmit) {
      this.handleAsyncConfirm();
    } else {
      this.handleConfirm();
    }
  };

  handleCancel = () => {
    this.ref.current.innerText = this.state.preservedContent;
    this.setState({
      status: STATUS.INIT,
      error: null,
    });
  };

  render() {
    const { children, className } = this.props;
    const { status, error } = this.state;

    const attachedProps = {
      contentEditable: status === STATUS.EDITING,
      ref: this.ref,
      suppressContentEditableWarning: true,
    };

    return (
      <Wrap
        className={className}
        status={status}
        error={error}
        onClick={this.handleEditStart}
        ref={this.outerRef}
      >
        {React.cloneElement(children, attachedProps)}
        {status === STATUS.EDITING && (
          <Actions>
            <Action onClick={this.handleCancel}>X</Action>
            <Action onClick={this.handleSubmit}>✓</Action>
          </Actions>
        )}
        {status === STATUS.LOADING && (
          <Loading>
            <Spinner size={30} />
          </Loading>
        )}
      </Wrap>
    );
  }
}

Editable.defaultProps = {
  onEditStart: () => {},
  onError: () => {},
  onConfirm: () => {},
  allowEmpty: false,
};

Editable.propTypes = {
  className: PropTypes.string, // For using styled components to re-style
  key: PropTypes.string, // To check if content updated
  onEditStart: PropTypes.func,
  onError: PropTypes.func,
  onConfirm: PropTypes.func,
  asyncProcessAfterSubmit: PropTypes.func,
  children: PropTypes.element.isRequired,
  allowEmpty: PropTypes.bool,
};

export default Editable;
