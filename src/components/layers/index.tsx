import React from 'react';
import styled from 'styled-components/macro';
import { FormattedMessage } from 'react-intl';

import Button from 'common/button';

import LayersStyle from './layers';

export default function Editor() {
  return (
    <Wrapper>
      <LayersStyle />
      <ButtonWrapper>
        <Button tertiary>
          <FormattedMessage id="cancel" />
        </Button>
        <Button primary>
          <FormattedMessage id="save" />
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  align-self: flex-end;
  gap: 1em;
`;
