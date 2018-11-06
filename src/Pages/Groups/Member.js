import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { UserMinus } from 'styled-icons/fa-solid';

const Row = styled.p`
  position: relative;
  line-height: 1.3;
  margin: 0;
  padding: 8px;
`;

const IconWrapper = styled.span`
  position: absolute;
  right: 8px;
  cursor: pointer;
`;

const Member = ({ studentID, name, instrument, onClickRemove }) => (
  <Row studentID={studentID}>
    {name}, {instrument}
    <IconWrapper>
      <UserMinus size={14} onClick={onClickRemove} />
    </IconWrapper>
  </Row>
);

Member.propTypes = {
  studentID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  instrument: PropTypes.string.isRequired,
  onClickRemove: PropTypes.func.isRequired,
};

export default Member;
