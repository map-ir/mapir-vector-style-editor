import React, { memo, useMemo, useState } from 'react';
import styled from 'styled-components/macro';

import SymbolEditor from './symbol-editor';
import CircleEditor from './circle-editor';

import type { PointLayer } from '../../types/map';

import { ReactComponent as Circle } from '../../assets/icons/circle.svg';
import { ReactComponent as Symbol } from '../../assets/icons/symbol.svg';
import { ReactComponent as Heatmap } from '../../assets/icons/heatmap.svg';
import { ReactComponent as Cluster } from '../../assets/icons/cluster.svg';

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
        <Symbol
          onClick={() => setLayerType('symbol')}
          color={
            layerType === 'symbol' ? 'var(--color-primary)' : 'var(--shade-4)'
          }
        />
        <Circle
          onClick={() => setLayerType('circle')}
          color={
            layerType === 'circle' ? 'var(--color-primary)' : 'var(--shade-4)'
          }
        />
        <Heatmap
          color={
            layerType === 'heatmap' ? 'var(--color-primary)' : 'var(--shade-4)'
          }
        />
        <Cluster
          color={
            layerType === 'cluster' ? 'var(--color-primary)' : 'var(--shade-4)'
          }
        />
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
