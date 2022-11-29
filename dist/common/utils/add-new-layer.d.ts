import { Dispatch, SetStateAction } from 'react';
import type { Style } from 'mapbox-gl';
export declare const addNewLayer: (type: string, setStyle: Dispatch<SetStateAction<Style | null>>, layer_id?: string) => void;
