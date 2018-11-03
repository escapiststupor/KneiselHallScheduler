import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BaseModal from './Base';
import {
  minWidth as withMinWidth,
  minHeight as withMinHeight,
} from 'styled-system';
import { colors } from '../style-variables';

const Dialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  background: #ffffff;
  font-family: 'PingFang TC', san-serif;
  font-weight: 400;
  box-shadow: 0 0 5px 0 ${colors.shadow};
  max-height: 95vh;
  ${withMinWidth} ${withMinHeight};
`;

const Header = styled.div`
  border-bottom: 1px solid ${colors.border};
  line-height: 1;
  font-size: 24px;
  font-weight: bold;
  color: ${colors.content};
  padding: 20px 20px 10px 20px;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  box-shadow: 0 1px 3px 0 ${colors.shadow};
  z-index: 1;
`;

const Footer = styled.div`
  display: flex;
  padding: 10px;
  min-height: fit-content;
  justify-content: flex-end;
  background-color: ${colors.minorBg};
`;

const Modal = ({
  title,
  minWidth,
  minHeight,
  isOpen,
  onClose,
  renderBody,
  renderFooter,
}) => (
  <BaseModal isOpen={isOpen} onClose={onClose}>
    <Dialog minWidth={minWidth} minHeight={minHeight}>
      <Header>{title}</Header>
      <Body>{renderBody()}</Body>
      {renderFooter && <Footer>{renderFooter()}</Footer>}
    </Dialog>
  </BaseModal>
);

Modal.defaultProps = {
  isOpen: false,
  onClose: () => {},
  minWidth: 600,
  minHeight: 300,
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  renderBody: PropTypes.func.isRequired,
  renderFooter: PropTypes.func,
  minWidth: PropTypes.number,
  minHeight: PropTypes.number,
  title: PropTypes.string.isRequired,
};

export default Modal;
