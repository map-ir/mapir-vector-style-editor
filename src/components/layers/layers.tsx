import React, { useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { useIntl } from 'react-intl';
import styled, { css } from 'styled-components/macro';

import { titleState } from 'atoms/general';
import { styleObjState, selectedLayerIDState } from 'atoms/map';

import GeoIcon from 'common/geo-icon';
import Expandable from 'common/expandable';
import { Row } from 'common/styles';
import ZoomRange from '../editor/zoom-range';
import SpecEditor from './spec-editor';
import { addNewLayer } from 'common/utils/add-new-layer';

import type { Layer } from 'mapbox-gl';
import type { LayerType } from 'types/map';

import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { ReactComponent as Point } from '../../assets/icons/point.svg';
import { ReactComponent as Line } from '../../assets/icons/line.svg';
import { ReactComponent as Polygon } from '../../assets/icons/polygon.svg';

const LayersStyle = () => {
  const intl = useIntl();
  const title = useAtomValue(titleState);
  const [styleObj, setStyleObj] = useAtom(styleObjState);
  const [openLayerID, setOpenLayerID] = useAtom(selectedLayerIDState);

  const [addLayer, isAdding] = useState(false);

  const toggleExpand = (layerID?: string) => {
    setOpenLayerID((currentid: string | undefined) =>
      currentid !== layerID ? layerID : undefined
    );
  };

  return (
    <Wrapper onClick={isAdding.bind(null, false)}>
      <Header>
        <Title>{title}</Title>
        {!addLayer && (
          <Icon
            onClick={(e) => {
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
              onClick={addNewLayer.bind(null, 'point', setStyleObj)}
            >
              <Point color={'var(--color-primary)'} />
            </Icon>
            <Icon
              title={intl.formatMessage({ id: 'line' })}
              bg={'var(--light-2)'}
              hover={'var(--color-primary-20)'}
              onClick={addNewLayer.bind(null, 'line', setStyleObj)}
            >
              <Line color={'var(--color-primary)'} />
            </Icon>
            <Icon
              title={intl.formatMessage({ id: 'polygon' })}
              bg={'var(--light-2)'}
              hover={'var(--color-primary-20)'}
              onClick={addNewLayer.bind(null, 'fill', setStyleObj)}
            >
              <Polygon color={'var(--color-primary)'} />
            </Icon>
          </StyledRow>
        )}
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
                  <GeoIcon
                    // title={intl.formatMessage({ id: type })}
                    data={type}
                    color={'var(--color-primary)'}
                  />
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

const Icon = styled.div<{ bg?: string; hover?: string }>`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 2em;
  height: 2em;
  background-color: ${(p) => (p.bg ? p.bg : 'var(--color-primary)')};
  border-radius: var(--radius-8);
  ${(p) =>
    p.hover &&
    css`
      &:hover {
        background-color: ${p.hover};
      }
    `}
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

const StyledRow = styled(Row)`
  padding: 0;
  gap: 1em;
`;
