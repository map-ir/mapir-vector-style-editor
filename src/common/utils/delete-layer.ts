import type { Map, StyleSpecification } from 'maplibre-gl';
import type { Dispatch, SetStateAction } from 'react';

const deleteLayer = (
  layer_id: string,
  map: Map,
  setStyle: Dispatch<SetStateAction<StyleSpecification | null>>
) => {
  if (!layer_id || !map) return;
  setStyle((curr_style) => {
    if (!curr_style) return null;
    // One layer is nesseccry
    if (curr_style?.layers?.length < 2) return curr_style;
    if (map.getLayer(layer_id)) map.removeLayer(layer_id);
    if (map.getLayer(`${layer_id}-text-layer`))
      map.removeLayer(`${layer_id}-text-layer`);

    const temp = { ...curr_style };

    return {
      ...temp,
      layers: [...temp.layers.filter((l) => l.id !== layer_id)],
    } as StyleSpecification;
  });
};

export default deleteLayer;
