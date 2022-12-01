/* eslint-disable @typescript-eslint/indent */
import { Dispatch, SetStateAction } from 'react';
import { nanoid } from 'nanoid';
import {
  DefaultSymbolLayer,
  DefaultLineLayer,
  DefaultFillLayer,
  DefaultCircleLayer,
  DefaultTextLayer,
} from 'components/constants';

import type { Layer, Style } from 'mapbox-gl';

export const addNewLayer = (
  type: string,
  setStyle: Dispatch<SetStateAction<Style | null>>,
  layer_id?: string
) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = type === 'text' && layer_id ? layer_id : nanoid();
  const defaultStyle =
    type === 'fill'
      ? DefaultFillLayer
      : type === 'line'
      ? DefaultLineLayer
      : type === 'circle'
      ? DefaultCircleLayer
      : type === 'text'
      ? DefaultTextLayer
      : DefaultSymbolLayer;

  setStyle((curr_style) => {
    if (!curr_style) return null;

    const temp = { ...curr_style };

    return {
      ...temp,
      layers: [
        ...temp.layers,
        {
          id: id,
          source: (temp?.layers as Layer[])?.[0]?.source,
          'source-layer': (temp?.layers as Layer[])?.[0]?.['source-layer'],
          ...defaultStyle,
        },
      ],
    } as Style;
  });
};
