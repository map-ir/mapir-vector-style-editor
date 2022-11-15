import { atom } from 'jotai';

import type { Map, Style, Layer } from 'mapbox-gl';
import type { MapProps } from 'types/map';

const mapState = atom<Map | null>(null);
const isMapLoadedState = atom<boolean>(false);
const mapPropsState = atom<MapProps>({
  transformRequest: (url: string) => ({ url }),
});
const styleURLState = atom<string>('');
const spriteState = atom<string | undefined>(undefined);
const styleObjState = atom<Style | null>(null);
const selectedLayerIDState = atom<string | undefined>(undefined);

const layerState = atom((get) => {
  const openLayerID = get(selectedLayerIDState);
  const styleObj = get(styleObjState);

  return styleObj?.layers?.find((l) => l.id === openLayerID) as Layer;
});

export {
  mapState,
  isMapLoadedState,
  mapPropsState,
  styleURLState,
  spriteState,
  styleObjState,
  selectedLayerIDState,
  layerState,
};
