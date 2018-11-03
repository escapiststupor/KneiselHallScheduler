import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { space } from 'styled-system';
import { colors } from '../style-variables';
import { ChevronDown } from 'styled-icons/fa-solid';

const ESC = 27;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: auto;
  text-align: center;
  ${space}
`;

const Msg = styled.span`
  color: ${colors.content};
  padding: 3px 0 6px;
  font-size: 1rem;
  display: inherit;
`;

const DropdownTrigger = styled.div`
  width: 60%;
  display: inline-block;
  background-color: ${colors.bg};
  border-radius: 5px;
  box-shadow: 0 0 2px ${colors.minorBg};
  transition: all 0.1s ease;
  position: relative;
  font-size: 14px;
  color: ${colors.darkGray};
  height: 100%;
  text-align: left;
  &:hover {
    box-shadow: 0 0 4px ${colors.minorBg};
  }

  ${props =>
    props.isOpen &&
    css`
      background-color: ${colors.lv2Bg};
      box-shadow: 0 0 4px ${colors.minorBg};
      border-radius: 5px 5px 0 0;
    `};
`;

const SelectBox = styled.div`
  cursor: pointer;
  display: block;
  padding: 10px;
  font-size: 1rem;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  background-color: ${colors.bg};
  width: 100%;
  left: 0;
  margin-top: 1px;
  box-shadow: 0 1px 2px ${colors.minorBg};
  border-radius: 0 1px 5px 5px;
  overflow: hidden;
  max-height: ${props => (props.isOpen ? '50vh' : '0')};
  overflow-y: auto;
  z-index: 9;
  padding: 0;
  list-style: none;
  transition: all 0.1s;

  li {
    padding: 10px;
    font-size: 1rem;
    transition: all 0.1s ease-in-out;
    cursor: pointer;
    &:hover {
      background-color: #f2f2f2;
    }
  }
`;

const IconWrapper = styled.div`
  font-size: 12px;
  color: ${colors.content};
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  float: right;
  line-height: 20px;
  transform: ${props => (props.isOpen ? 'rotate(-90deg)' : 'none')};
`;

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.elem = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('keyup', this.handleESC);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('keyup', this.handleESC);
  }

  handleClickOutside = event => {
    if (this.elem.current && !this.elem.current.contains(event.target)) {
      this.handleClose();
    }
  };

  handleESC = event => {
    if (event.key === 'Escape' || event.keyCode === ESC) {
      this.handleClose();
    }
  };

  handleClose = () => this.setState({ isOpen: false });

  handleOpen = () => this.setState({ isOpen: true });

  render() {
    const { options, title, onChange, value } = this.props;

    const { isOpen } = this.state;

    const selectedOption = options[options.map(item => item.ID).indexOf(value)];

    return (
      <Container {...this.props}>
        {title && <Msg>{title}</Msg>}
        <DropdownTrigger isOpen={isOpen} onClick={this.handleOpen}>
          <SelectBox>
            <span>
              {selectedOption ? selectedOption.text : 'please select'}
            </span>
            <IconWrapper isOpen={isOpen}>
              <ChevronDown size="13" />
            </IconWrapper>
          </SelectBox>
          <input type="hidden" name="gender" />
          <DropdownMenu isOpen={isOpen} ref={this.elem}>
            {options.map(option => (
              <li
                key={option.ID}
                onClick={e => {
                  e.stopPropagation();
                  this.handleClose();
                  onChange(option.ID);
                }}
              >
                {option.text}
              </li>
            ))}
          </DropdownMenu>
        </DropdownTrigger>
      </Container>
    );
  }
}

Select.defaultProps = {
  onChange: () => {},
};

Select.propTypes = {
  /** supply an array of options, each an object with `ID` (a unique key to be called by `onChange`) and `text` (to be shown on UI) */
  options: PropTypes.arrayOf(
    PropTypes.shape({ ID: PropTypes.string, text: PropTypes.string })
  ).isRequired,
  title: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default Select;
