import { Dispatch, SetStateAction } from 'react';
import type { Expression, Map, Style, StyleFunction } from 'mapbox-gl';
declare const updateStyle: (layer_id: string, map: Map, type: 'layout' | 'paint' | 'zoom', key: string | number, value: number | number[] | Expression | StyleFunction | string, setStyle: Dispatch<SetStateAction<Style | null>>) => void;
export default updateStyle;
