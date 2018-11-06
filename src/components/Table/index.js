import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { justifyContent, width, space } from 'styled-system';
import { colors } from '../style-variables';
// import Icon from '@/components/Icon';

const Row = styled.div`
  display: flex;
  border: 1px solid ${colors.border};
  overflow: hidden;
  text-overflow: ellipsis;
  ${justifyContent}
  ${props =>
    props.hint &&
    `
    line-height: 1.2;
    font-size: 12px;
    color: ${colors.hint};
  `} 

  > * + * {
    margin-left: -1px;
    border-left: 1px solid ${colors.border};
  }
`;

const Wrap = styled.div`
  border-radius: 4px;
  ${width}
  ${space}

  ${Row} + ${Row} {
    margin-top: -1px;
  }
`;

const Column = styled.div`
  flex: 0 0.1 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  user-select: none;
  width: 100%;
`;

class Table extends Component {
  renderHeader = header => <Column key={header}>{header}</Column>;

  renderRow = rowData => {
    return (
      <Row key={rowData.ID}>
        {Object.keys(rowData)
          .filter(key => key !== 'ID')
          .map(key => (
            <Column key={key}>{rowData[key]}</Column>
          ))}
      </Row>
    );
  };

  render() {
    const {
      data: { headers, values },
    } = this.props;
    return (
      <Wrap m={3} {...this.props}>
        <Row key="header" hint>
          {headers.map(this.renderHeader)}
        </Row>
        {values.map(this.renderRow)}
        <Row justifyContent="flex-end" />
      </Wrap>
    );
  }
}

Table.propTypes = {
  data: PropTypes.shape({
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    values: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default Table;
