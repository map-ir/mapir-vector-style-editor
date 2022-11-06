import { Dispatch, SetStateAction } from 'react';

import type {
  Expression,
  Map,
  Style,
  StyleFunction,
  AnyLayer,
} from 'mapbox-gl';

const updateStyle = (
  layer_id: string,
  map: Map,
  type: 'layout' | 'paint' | 'zoom',
  key: string | number,
  value: number | number[] | Expression | StyleFunction | string,
  setStyle: Dispatch<SetStateAction<Style | null>>
) => {
  console.log('🚀 ~ file: update-style.ts ~ line 12 ~ type', type);
  console.log('🚀 ~ file: update-style.ts ~ line 12 ~ value', value);
  console.log('🚀 ~ file: update-style.ts ~ line 12 ~ key', key);
  if (!layer_id || !map) return;

  switch (type) {
    case 'layout':
      map?.setLayoutProperty(layer_id, key as string, value);
      break;
    case 'paint':
      map?.setPaintProperty(layer_id, key as string, value);
      break;
    case 'zoom':
      map?.setLayerZoomRange(layer_id, key as number, value as number);
      break;
  }

  setStyle((curr_style) => {
    if (!curr_style) return null;

    const selectedLayer = curr_style.layers?.filter((l) => l.id === layer_id);

    const indexOfSelectedLayer = curr_style.layers.findIndex(
      (i) => i.id === selectedLayer[0].id
    );

    const newLayers = ([] as AnyLayer[]).concat(curr_style.layers);
    newLayers[indexOfSelectedLayer] = {
      ...selectedLayer[0],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      [type]: {
        // @ts-ignore line
        ...selectedLayer[0][type],
        [key]: value,
      },
    };

    return {
      ...curr_style,
      layers: newLayers,
    };
  });
};

export default updateStyle;
