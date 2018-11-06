import styled from 'styled-components';
import { colors } from '../../style-variables';

const Overlay = styled.div`
  position: fixed;
  z-index: ${colors.hint};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;

  background-color: ${colors.gray};
`;

export default Overlay;
