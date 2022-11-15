import type { MapboxOptions, TransformRequestFunction } from 'mapbox-gl';

interface MapProps extends Partial<MapboxOptions> {
  transformRequest: TransformRequestFunction;
}
type PointLayer = 'circle' | 'symbol' | 'cluster' | 'heatmap';
type LayerType = PointLayer | 'line' | 'fill';

type Icon = Record<
  string,
  {
    width: number;
    height: number;
    x: number;
    y: number;
  }
>;

export type { MapProps, PointLayer, LayerType, Icon };
