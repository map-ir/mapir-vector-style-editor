import { Dispatch, SetStateAction } from 'react';
import type { Map, Style } from 'mapbox-gl';

const updateStyle = (
  layer_id: string,
  map: Map,
  type: 'layout' | 'paint' | 'zoom',
  key: string | number,
  value: string | number,
  setStyle: Dispatch<SetStateAction<Style | null>>
) => {
  console.log('🚀 ~ file: update-style.ts ~ line 12 ~ key', key);
  if (!layer_id || !map) return;

  switch (type) {
    case 'layout':
      map?.setLayoutProperty(layer_id, key as string, value);
      break;
    case 'zoom':
      map?.setLayerZoomRange(layer_id, key as number, value as number);
      break;
  }

  setStyle((curr_style) => {
    if (!curr_style) return null;

    const selectedLayer = map.getLayer(layer_id);

    return {
      ...curr_style,
      layers: [
        ...curr_style.layers.filter((l) => l.id !== layer_id),
        ...[selectedLayer],
      ],
      // [
      //   ...new Set([...curr_style.layers, ...[selectedLayer]]),
      // ] as AnyLayer[],
    };
  });
};

export default updateStyle;
