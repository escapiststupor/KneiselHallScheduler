import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { width, space } from 'styled-system';
import { colors } from '../style-variables';

const RawInput = styled.input.attrs({
  spellCheck: false,
})`
  border: none;
  padding: 8px;
  margin: 4px;
  box-shadow: 0 0 1px 1px ${colors.minorBg};
  position: relative;
  outline: none;
  font-size: 1rem;
  width: 100%;

  &:focus {
    box-shadow: 0 0 1px 1px ${colors.hint};
    color: ${colors.content};
  }

  ::placeholder {
    color: ${colors.shadow};
  }
  ${width}
  ${space}
`;

const Input = props => <RawInput {...props} />;

Input.defaultProps = {
  /** as you would normally pass in html5 input element */
  type: 'text',
};

Input.propTypes = {
  /** as you would normally pass in html5 input element */
  type: PropTypes.string,
};

export default Input;
