import type { Map, Style } from 'mapbox-gl';
import type { Dispatch, SetStateAction } from 'react';
declare const deleteLayer: (layer_id: string, map: Map, setStyle: Dispatch<SetStateAction<Style | null>>) => void;
export default deleteLayer;
