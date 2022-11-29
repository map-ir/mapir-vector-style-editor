import type { MapboxOptions, TransformRequestFunction } from 'mapbox-gl';
interface MapProps extends Partial<MapboxOptions> {
    transformRequest: TransformRequestFunction;
}
declare type PointLayer = 'circle' | 'symbol' | 'cluster' | 'heatmap';
declare type LayerType = PointLayer | 'line' | 'fill';
declare type Icon = Record<string, {
    width: number;
    height: number;
    x: number;
    y: number;
}>;
export type { MapProps, PointLayer, LayerType, Icon };
