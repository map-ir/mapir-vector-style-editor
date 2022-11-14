import React, { useState, useRef, MouseEvent } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { useIntl } from 'react-intl';
import styled from 'styled-components/macro';

import { titleState } from 'atoms/general';
import { styleObjState, selectedLayerIDState, mapState } from 'atoms/map';

import GeoIcon from 'common/geo-icon';
import Expandable from 'common/expandable';
import { Row, Icon } from 'common/styles';
import ZoomRange from '../editor/zoom-range';
import SpecEditor from './spec-editor';
import { addNewLayer } from 'common/utils/add-new-layer';
import deleteLayer from 'common/utils/delete-layer';

import useOutsideClickHandler from 'hooks/useOutsideClickHandler';

import type { Layer } from 'mapbox-gl';
import type { LayerType } from 'types/map';

import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { ReactComponent as Point } from '../../assets/icons/point.svg';
import { ReactComponent as Line } from '../../assets/icons/line.svg';
import { ReactComponent as Polygon } from '../../assets/icons/polygon.svg';

function LayersStyle() {
  const intl = useIntl();
  const map = useAtomValue(mapState);
  const title = useAtomValue(titleState);
  const [styleObj, setStyleObj] = useAtom(styleObjState);
  const [openLayerID, setOpenLayerID] = useAtom(selectedLayerIDState);

  const [addLayer, isAdding] = useState(false);

  const addLayerRef = useRef<HTMLDivElement>(null);
  useOutsideClickHandler(addLayerRef, isAdding.bind(null, false));

  const toggleExpand = (layerID?: string) => {
    setOpenLayerID((currentid: string | undefined) =>
      currentid !== layerID ? layerID : undefined
    );
  };

  const handleAddLayer = (type: string) => {
    addNewLayer(type, setStyleObj);
    isAdding(false);
  };

  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
        <div ref={addLayerRef}>
          {!addLayer && (
            <Icon
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
                isAdding(true);
              }}
            >
              <Plus color={'var(--light-1)'} />
            </Icon>
          )}
          {addLayer && (
            <StyledRow>
              <Icon
                title={intl.formatMessage({ id: 'point' })}
                bg={'var(--light-2)'}
                hover={'var(--color-primary-20)'}
                onClick={() => handleAddLayer('point')}
              >
                <Point color={'var(--color-primary)'} />
              </Icon>
              <Icon
                title={intl.formatMessage({ id: 'line' })}
                bg={'var(--light-2)'}
                hover={'var(--color-primary-20)'}
                onClick={() => handleAddLayer('line')}
              >
                <Line color={'var(--color-primary)'} />
              </Icon>
              <Icon
                title={intl.formatMessage({ id: 'polygon' })}
                bg={'var(--light-2)'}
                hover={'var(--color-primary-20)'}
                onClick={() => handleAddLayer('fill')}
              >
                <Polygon color={'var(--color-primary)'} />
              </Icon>
            </StyledRow>
          )}
        </div>
      </Header>
      <LayersContainer>
        {styleObj?.layers
          ?.filter((layer: Layer) => !layer?.id?.endsWith('-text-layer'))
          ?.map((layer: Layer) => {
            const { id, type } = layer;
            const open = openLayerID === id;

            return (
              <Expandable
                key={id}
                open={open}
                onOpen={toggleExpand.bind(null, id)}
                HeaderRenderer={() => (
                  <ExpandHeader>
                    <GeoIcon
                      // title={intl.formatMessage({ id: type })}
                      data={type}
                      color={'var(--color-primary)'}
                    />
                    <Delete
                      style={{ cursor: 'pointer' }}
                      color={'var(--shade-3)'}
                      onClick={() => map && deleteLayer(id, map, setStyleObj)}
                    />
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
}

export default LayersStyle;

const Wrapper = styled.div`
  width: 100%;
  max-height: 92%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1em;
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

const LayersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1em;
  overflow: hidden;
  overflow-y: auto;
  scrollbar-gutter: stable both-edges;
`;

const ExpandBody = styled(LayersContainer)`
  gap: 0;
  padding-bottom: 1em;
`;

const StyledRow = styled(Row)`
  padding: 0;
  gap: 1em;
`;
