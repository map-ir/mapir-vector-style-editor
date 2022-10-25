/* eslint-disable @typescript-eslint/indent */
import { Dispatch, SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  DefaultSymbolLayer,
  DefaultLineLayer,
  DefaultFillLayer,
  DefaultCircleLayer,
} from 'components/constants';

import type { Layer, Style } from 'mapbox-gl';

export const addNewLayer = (
  type: string,
  setStyle: Dispatch<SetStateAction<Style | null>>
) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuidv4();
  const defaultStyle =
    type === 'fill'
      ? DefaultFillLayer
      : type === 'line'
      ? DefaultLineLayer
      : type === 'circle'
      ? DefaultCircleLayer
      : DefaultSymbolLayer;

  setStyle((curr_style) => {
    if (!curr_style) return null;

    return {
      ...curr_style,
      layers: [
        ...curr_style.layers,
        {
          id: id,
          source: (curr_style?.layers as Layer[])?.[0]?.source,
          'source-layer': (curr_style?.layers as Layer[])?.[0]?.[
            'source-layer'
          ],
          ...defaultStyle,
        },
      ],
    } as Style;
  });
};
