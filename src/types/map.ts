/* eslint-disable @typescript-eslint/indent */
import type { CompleteMapOptions, RequestTransformFunction } from 'maplibre-gl';

interface MapOptions
  extends Partial<Omit<CompleteMapOptions, 'attributionControl'>> {
  transformRequest: RequestTransformFunction;
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
