import React from 'react';
import { useAtomValue } from 'jotai';
import styled from 'styled-components/macro';
import { FormattedMessage } from 'react-intl';

import Button from 'common/button';

import LayersStyle from './layers';

import { styleObjState } from 'atoms/map';

import type { Style } from 'mapbox-gl';

interface IProps {
  onSubmit?: (arg: Style | null) => void;
}

export default function Editor({ onSubmit }: IProps) {
  const styleObj = useAtomValue(styleObjState);
  return (
    <Wrapper>
      <LayersStyle />
      <ButtonWrapper>
        <Button tertiary>
          <FormattedMessage id="cancel" />
        </Button>
        <Button primary onClick={() => onSubmit?.(styleObj)}>
          <FormattedMessage id="save" />
        </Button>
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
  border: 1px solid var(--shade-4);
  border-radius: var(--radius-16);
  padding: 1em;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  align-self: flex-end;
  gap: 1em;
`;
