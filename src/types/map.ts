import type { MapboxOptions, TransformRequestFunction } from 'mapbox-gl';

interface MapProps extends Partial<MapboxOptions> {
  transformRequest: TransformRequestFunction;
}

export type { MapProps };
