import React, { useState } from 'react';
import { useAtomValue } from 'jotai';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import Button from 'common/button';

import LayersStyle from './layers';

import { styleObjState } from 'atoms/map';

import type { Style } from 'mapbox-gl';

interface IProps {
  onSubmit?: (arg: Style | null) => void;
  onCancle?: (arg: Style | null) => void;
}

export default function LayersEditor({ onSubmit, onCancle }: IProps) {
  const styleObj = useAtomValue(styleObjState);

  return (
    <Wrapper>
      <LayersStyle />
      <ButtonWrapper>
        {onCancle && (
          <Button tertiary onClick={() => onCancle(styleObj)}>
            <FormattedMessage id="cancel" />
          </Button>
        )}
        {onSubmit && (
          <Button primary onClick={() => onSubmit(styleObj)}>
            <FormattedMessage id="save" />
          </Button>
        )}
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
  border: 1px solid var(--SE-shade-4);
  border-radius: var(--SE-radius-16);
  padding: 1em;
  @media screen and (max-width: 1920px) {
    width: 30%;
  }
  @media screen and (max-width: 1630px) {
    width: 40%;
  }
  @media screen and (max-width: 1180px) {
    width: 45%;
  }
  @media screen and (max-width: 1024px) {
    width: 55%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  align-self: flex-end;
  gap: 1em;
`;
