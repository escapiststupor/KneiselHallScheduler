import React from 'react';
import styled, { keyframes } from 'styled-components';

const loading = keyframes`
    0% {
      transform: scale(1);
    }

    20% {
      transform: scale(1, 2.2);
    }

    40% {
      transform: scale(1);
    }
`;

const Div = styled.div`
  display: inline-block;

  > div {
    display: inline-block;
    width: 4px;
    height: 18px;
    border-radius: 4px;
    margin-right: 6px;
    animation: ${loading} 1s ease-in-out infinite;

    :nth-child(1) {
      background-color: #3498db;
      animation-delay: 0;
    }

    :nth-child(2) {
      background-color: #c0392b;
      animation-delay: 0.09s;
    }

    :nth-child(3) {
      background-color: #f1c40f;
      animation-delay: 0.18s;
    }

    :nth-child(4) {
      background-color: #27ae60;
      animation-delay: 0.27s;
    }
  }
`;

const Loading = () => (
  <Div>
    <div />
    <div />
    <div />
    <div />
  </Div>
);

export default Loading;
