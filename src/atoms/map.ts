import { atom } from 'jotai';

import type { Map, StyleSpecification, LayerSpecification } from 'maplibre-gl';

const mapState = atom<Map | null>(null);
const isMapLoadedState = atom<boolean>(false);

const styleURLState = atom<string>('');
const spriteState = atom<string | undefined>(undefined);
const styleObjState = atom<StyleSpecification | null>(null);
const selectedLayerIDState = atom<string | undefined>(undefined);

const layerState = atom((get) => {
  const openLayerID = get(selectedLayerIDState);
  const styleObj = get(styleObjState);

  return styleObj?.layers?.find(
    (l) => l.id === openLayerID
  ) as LayerSpecification;
});

export {
  mapState,
  isMapLoadedState,
  styleURLState,
  spriteState,
  styleObjState,
  selectedLayerIDState,
  layerState,
};
