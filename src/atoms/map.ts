import { atom } from 'jotai';

import type { Map, Style } from 'mapbox-gl';
import type { MapProps } from 'types/map';

const mapState = atom<Map | null>(null);
const isMapLoadedState = atom<boolean>(false);
const mapPropsState = atom<MapProps>({
  transformRequest: (url: string) => ({ url }),
});
const styleURLState = atom<string>('');
const styleObjState = atom<Style | null>(null);
const selectedLayerIDState = atom<string | undefined>(undefined);

export {
  mapState,
  isMapLoadedState,
  mapPropsState,
  styleURLState,
  styleObjState,
  selectedLayerIDState,
};
