import type { MapboxOptions, TransformRequestFunction } from 'mapbox-gl';

interface MapOptions
  extends Partial<Omit<MapboxOptions, 'attributionControl'>> {
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

export type { MapOptions, PointLayer, LayerType, Icon };
