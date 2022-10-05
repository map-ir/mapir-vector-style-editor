import React, { useState } from 'react';
import Styled from 'styled-components/macro';
import { FormattedMessage } from 'react-intl';
import { useAtomValue } from 'jotai';

import RangeSlider from '../../common/range-slider';
import InputNumber from '../../common/input-number';

import { mapState } from '../../atoms/map';

import type { Layer } from 'mapbox-gl';

interface IProps {
  id: string;
}

const ZoomrRange = ({ id }: IProps) => {
  const map = useAtomValue(mapState);

  const [zoom, setZoom] = useState<number[]>([
    (map?.getLayer(id) as Layer)?.minzoom ?? 1,
    (map?.getLayer(id) as Layer)?.maxzoom ?? 20,
  ]);

  const zoomChange = (value: number[]) => {
    if (map) {
      map?.setLayerZoomRange(id, value[0], value[1]);
      setZoom(value);
    }
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
          value={zoom[1]}
          onChange={(number) => zoomChange([zoom[0], number])}
        />
        <RangeSlider
          // defaultValue={[zoom[0], zoom[1]]}
          value={[zoom[0], zoom[1]]}
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
          value={zoom[0]}
          onChange={(number) => zoomChange([number, zoom[1]])}
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
