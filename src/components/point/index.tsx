import React, { memo, useMemo, useState } from 'react';
import styled from 'styled-components/macro';

import SymbolEditor from './symbol-editor';
import CircleEditor from './circle-editor';

import type { PointLayer } from '../../types/map';

interface IProps {
  type: PointLayer;
}
const PointEditor = ({ type }: IProps) => {
  const [layerType, setLayerType] = useState(type);

  const EditorType = useMemo(() => {
    return {
      symbol: SymbolEditor,
      circle: CircleEditor,
      heatmap: () => <></>,
      cluster: () => <></>,
    }[layerType];
  }, [layerType]);

  return (
    <Wrapper>
      <LayerType>
        <div onClick={() => setLayerType('symbol')}>symbol</div>
        <div onClick={() => setLayerType('circle')}>circle</div>
        <div>heatmap</div>
        <div>cluster</div>
      </LayerType>
      <EditorType />
    </Wrapper>
  );
};

export default memo(PointEditor);

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1em;
`;

const LayerType = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-top: 1px solid var(--shade-5);
  border-bottom: 1px solid var(--shade-5);
  padding: 0.5em 0;
`;
