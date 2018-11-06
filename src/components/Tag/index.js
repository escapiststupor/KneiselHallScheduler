import React from 'react';
import styled from 'styled-components';
import { colors } from '../style-variables';

const Wrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 4px;
  background-color: ${colors.minorBg};
  border-radius: 4px;
  border: 1px solid ${props => props.color};
  color: ${colors.content};
  font-size: 14px;
  line-height: 24px;
  align-self: center;
  padding: 0 4px 0 8px;
`;

const CancelButton = styled.span`
  color: ${colors.hint};
  border-radius: 50%;
  height: 1em;
  width: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 6px;
  cursor: pointer;

  &::before {
    content: '×';
    display: block;
  }

  &:hover {
    background-color: #fff;
    color: #333;
  }
`;

const Left = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  line-height: 1;
  height: 40px;
  justify-content: center;
  font-weight: 500;
`;

const Hint = styled.span`
  color: ${colors.hint};
  font-size: 12px;
`;

const Tag = props => {
  const { tag, key, disabled, onRemove, getTagDisplayValue } = props;

  const obj = getTagDisplayValue(tag);

  return (
    <Wrapper key={key} color={obj.color}>
      <Left>
        <Hint>{obj.name}</Hint>
        <div>{obj.value}</div>
      </Left>
      {!disabled && <CancelButton onClick={() => onRemove(key)} />}
    </Wrapper>
  );
};

export default Tag;
