import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import styled from 'styled-components/macro';

import { titleState } from '../../atoms/general';
import { styleObjState, selectedLayerIDState } from '../../atoms/map';

import Expandable from '../../common/expandable';
import ZoomRange from '../editor/zoom-range';
import SpecEditor from './spec-editor';

import type { Layer } from 'mapbox-gl';
import type { LayerType } from '../../types/map';
import GeoIcon from '../../common/geo-icon';

import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';

const LayersStyle = () => {
  const title = useAtomValue(titleState);
  const styleObj = useAtomValue(styleObjState);

  const [openLayerID, setOpenLayerID] = useAtom(selectedLayerIDState);

  const toggleExpand = (layerID?: string) => {
    setOpenLayerID((currentid: string | undefined) =>
      currentid !== layerID ? layerID : undefined
    );
  };

  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
        <Icon>
          <Plus color={'var(--light-1)'} />
        </Icon>
      </Header>
      <LayersContainer>
        {styleObj?.layers?.map((layer: Layer) => {
          const { id, type } = layer;
          const open = openLayerID === id;

          return (
            <Expandable
              key={id}
              open={open}
              onOpen={toggleExpand.bind(null, id)}
              HeaderRenderer={() => (
                <ExpandHeader>
                  <GeoIcon data={type} color={'var(--color-primary)'} />
                  <Delete color={'var(--shade-3)'} />
                </ExpandHeader>
              )}
            >
              <ExpandBody>
                <ZoomRange />
                <SpecEditor type={type as LayerType} />
              </ExpandBody>
            </Expandable>
          );
        })}
      </LayersContainer>
    </Wrapper>
  );
};

export default LayersStyle;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1em;
  border: 1px solid var(--shade-4);
  border-radius: var(--radius-16);
  padding: 1em;
  box-sizing: border-box;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
`;

const ExpandHeader = styled(Header)``;

const Title = styled.h2`
  margin: 0;
`;

const Icon = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 2em;
  height: 2em;
  background-color: var(--color-primary);
  border-radius: var(--radius-8);
`;

const LayersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1em;
`;

const ExpandBody = styled(LayersContainer)`
  gap: 0;
  padding-bottom: 1em;
`;
