import React, { useState } from 'react';
import { useAtomValue } from 'jotai';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Editor from '@monaco-editor/react';

import Button from 'common/button';

import LayersStyle from './layers';

import { styleObjState } from 'atoms/map';

import { ReactComponent as CodeIcon } from '../../assets/icons/code.svg';

import type { Style } from 'mapbox-gl';

interface IProps {
  onSubmit?: (arg: Style | null) => void;
  onCancle?: (arg: Style | null) => void;
}

export default function LayersEditor({ onSubmit, onCancle }: IProps) {
  const styleObj = useAtomValue(styleObjState);

  const [showEditor, setShowEditor] = useState(false);

  return (
    <Wrapper>
      {showEditor ? (
        <div style={{ direction: 'ltr' }}>
          <Editor
            // height="90vh"
            defaultLanguage="json"
            defaultValue={
              JSON.stringify(styleObj?.layers) ?? 'There is no layer'
            }
            onMount={(editor, monaco) => {
              // @ts-ignore
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
              monaco.editor.getAction('editor.action.formatDocument').run();
              console.log(
                '🚀 ~ file: index.tsx:41 ~ LayersEditor ~ monaco',
                monaco
              );
            }}
          />
        </div>
      ) : (
        <LayersStyle />
      )}

      <ButtonWrapper>
        <CodeIcon
          onClick={() => {
            setShowEditor(!showEditor);
          }}
          width={30}
          color="var(--SE-shade-2)"
        />
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
