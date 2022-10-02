import React from 'react';
import styled from 'styled-components/macro';

const LayersStyle = () => {
  return (
    <Wrapper>
      <div>plus</div>
    </Wrapper>
  );
};

export default LayersStyle;

const Wrapper = styled.div`
  border: 1px solid var(--shade-3);
  border-radius: 5px;
  width: 100%;
  padding: 1em;
  box-sizing: border-box;
`;
