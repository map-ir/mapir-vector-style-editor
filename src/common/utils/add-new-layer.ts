/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/indent */
import { Dispatch, SetStateAction } from 'react';
import { nanoid } from 'nanoid';
import {
  DefaultSymbolLayer,
  DefaultLineLayer,
  DefaultFillLayer,
  DefaultCircleLayer,
  DefaultHeatmapLayer,
} from 'components/constants';

import type { StyleSpecification } from 'maplibre-gl';

export const addNewLayer = (
  type: string,
  setStyle: Dispatch<SetStateAction<StyleSpecification | null>>,
  layer_id?: string
) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = layer_id ? layer_id : nanoid();
  const defaultStyle =
    type === 'fill'
      ? DefaultFillLayer
      : type === 'line'
      ? DefaultLineLayer
      : type === 'circle'
      ? DefaultCircleLayer
      : type === 'heatmap'
      ? DefaultHeatmapLayer
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
          source: (temp?.layers?.[0] as any)?.source,
          'source-layer': (temp?.layers?.[0] as any)?.['source-layer'],
          ...defaultStyle,
        },
      ],
    } as StyleSpecification;
  });
};
