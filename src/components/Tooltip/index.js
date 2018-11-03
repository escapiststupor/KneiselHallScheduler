import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { flex, space } from 'styled-system';
import { colors } from '../style-variables';

const Tip = styled.span`
  background: ${colors.black};
  color: #fefefe;
  line-height: 1;
  padding: 0.3em 0.6em;
  border-radius: 3px;
  font-size: 0.8rem;
  ${space};
`;

const TipWrapper = styled.span`
  position: fixed;
  transform: translate(-50%, -100%);
  padding-bottom: 1em;

  :after {
    position: absolute;
    display: block;
    content: '';
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: -1em;
    border-top: 10px solid #333;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }
`;

class Tooltip extends Component {
  constructor() {
    super();
    this.state = {
      isHovered: false,
    };
  }
  targetRef = ref => {
    this.target = ref;
  };
  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };
  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  computedTipPosition = () => {
    const { top, left, width } = this.target.getBoundingClientRect();
    return {
      top,
      left: left + width / 2,
    };
  };
  renderContent() {
    if (!this.state.isHovered) return null;
    return (
      <TipWrapper style={this.computedTipPosition()}>
        <Tip>{this.props.content}</Tip>
      </TipWrapper>
    );
  }

  render() {
    return React.createElement(
      this.props.type === 'block' ? 'div' : 'span',
      {
        style: flex(this.props),
        ref: this.targetRef,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
      },
      [this.props.children, this.renderContent()]
    );
  }
}

Tooltip.defaultProps = {
  type: 'inline',
};

Tooltip.propTypes = {
  type: PropTypes.oneOf(['inline', 'block']),
  content: PropTypes.node.isRequired,
  children: PropTypes.string.isRequired,
};

export default Tooltip;
