import React, { useState } from 'react';
import Styled from 'styled-components/macro';
import { FormattedMessage } from 'react-intl';
import { useAtomValue, useSetAtom } from 'jotai';

import RangeSlider from 'common/range-slider';
import InputNumber from 'common/input-number';
import UpdateStyle from 'common/utils/update-style';
import useGetSelectedLayer from 'hooks/useGetSelectedLayer';

import { mapState, selectedLayerIDState, styleObjState } from 'atoms/map';

import type { Layer } from 'mapbox-gl';

const ZoomrRange = () => {
  const map = useAtomValue(mapState);
  const openLayerID = useAtomValue(selectedLayerIDState);
  const setStyleObj = useSetAtom(styleObjState);

  const { layer } = useGetSelectedLayer();

  const zoomChange = (value: number[]) => {
    if (!openLayerID || !map) return;
    console.log(
      '🚀 ~ file: zoom-range.tsx ~ line 23 ~ zoomChange ~ value',
      value
    );
    UpdateStyle(openLayerID, map, 'zoom', value[0], value[1], setStyleObj);
  };

  return (
    <Wrapper>
      <Title>
        <FormattedMessage id="zoom_range" />
      </Title>
      <Slider>
        <InputNumber
          min={1}
          max={20}
          value={(layer as Layer)?.maxzoom ?? 20}
          onChange={(number) =>
            zoomChange([(layer as Layer)?.minzoom ?? 1, number])
          }
        />
        <RangeSlider
          // defaultValue={[zoom[0], zoom[1]]}
          value={[
            (layer as Layer)?.minzoom ?? 1,
            (layer as Layer)?.maxzoom ?? 20,
          ]}
          min={1}
          max={20}
          step={1}
          minStepsBetweenThumbs={0}
          aria-label="Zoom"
          onValueChange={(value) => zoomChange(value)}
        />
        <InputNumber
          min={1}
          max={20}
          value={(layer as Layer)?.minzoom ?? 1}
          onChange={(number) =>
            zoomChange([number, (layer as Layer)?.maxzoom ?? 20])
          }
        />
      </Slider>
    </Wrapper>
  );
};

export default ZoomrRange;

const Wrapper = Styled.div`
width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1em 0;
    gap: 1em;
`;

const Title = Styled.div`
/* flex-grow: 1; */
width: 30%;
text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: var(--shade-2);
`;

const Slider = Styled.div`
/* flex-grow: 3; */
width: 70%;
display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5em;
`;
