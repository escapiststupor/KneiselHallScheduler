import styled from 'styled-components';
import { fontSize, space, display } from 'styled-system';
import { colors } from '../style-variables';
import { decideThemeFactory } from '../styled-utils';

export const decideTheme = decideThemeFactory(['minor']);
export const themes = {
  default: {
    bg: colors.black,
    borderColor: colors.black,
    color: '#fff',
    shadow: '#777',
    hover: {
      bg: '#000',
      color: '#fff',
    },
    disabled: {
      bg: '#666',
      color: '#ccc',
      borderColor: '#666',
    },
  },
  minor: {
    bg: '#fff',
    borderColor: colors.border,
    color: colors.hint,
    shadow: 'rgba(0,0,0,0.1)',
    hover: {
      bg: '#eee',
      color: colors.hint,
    },
    disabled: {
      bg: '#fff',
      color: colors.border,
      borderColor: '#eee',
    },
  },
};

const Button = styled.button.attrs({
  theme: props => themes[decideTheme(props)],
})`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  outline: none !important;
  transition: 0.3 background-color;
  border-width: 1px;
  border-style: solid;
  user-select: none;
  font-size: 14px;
  line-height: 1.8;
  padding: 0 0.8em;
  white-space: nowrap;
  ${fontSize}
  ${space}
  ${display}

  ${p => `
    background-color: ${p.theme.bg};
    border-color: ${p.theme.borderColor};
    color: ${p.theme.color};
    box-shadow: 0 2px 0 0 ${p.theme.shadow};

    &:hover {
      color: ${p.theme.hover.color};
      box-shadow: 0 3px 0 0 ${p.theme.shadow};
      transform: translateY(-1px);
    }

    &:active {
      border-style: solid;
      background-color: ${p.theme.bg};
      color: ${p.theme.color};
      box-shadow: none;
      transform: translateY(2px);
    }

    ${p.disabled &&
      `
      color: ${p.theme.disabled.color};
      background-color: ${p.theme.disabled.bg};
      border-color: ${p.theme.disabled.borderColor};
      box-shadow: none;
      cursor: not-allowed;
      transform: none;
      &:hover {
        background-color: ${p.theme.disabled.bg};
        color: ${p.theme.disabled.color};
        box-shadow: none;
        transform: none;
      }
    `}
  `}

  &:focus {
    outline: none !important;
  }
`;

export default Button;
