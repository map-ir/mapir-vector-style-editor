import { atom } from 'jotai';

import type { Map } from 'mapbox-gl';
import type { MapProps } from 'types/map';

const mapState = atom<Map | null>(null);
const isMapLoadedState = atom<boolean>(false);
const mapPropsState = atom<MapProps>({
  transformRequest: (url: string) => ({ url }),
});

export { mapState, isMapLoadedState, mapPropsState };
