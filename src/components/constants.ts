import type {
  CircleLayerSpecification,
  FillLayerSpecification,
  LineLayerSpecification,
  SymbolLayerSpecification,
  HeatmapLayerSpecification,
} from 'maplibre-gl';

export interface ITab<T> {
  id: T;
  disabled?: boolean;
}

const symbolPageIds = ['symbol', 'other', 'title'] as const;
export type SymbolPageIdsType = typeof symbolPageIds[number];
export const symbolTabs: ITab<SymbolPageIdsType>[] = [
  {
    id: 'symbol',
  },
  {
    id: 'title',
    disabled: false,
  },
  {
    id: 'other',
    disabled: false,
  },
];

const heatmapPageIds = ['heatmap', 'heatmap-weight', 'other'] as const;
export type HeatmapPageIdsType = typeof heatmapPageIds[number];
export const heatmapTabs: ITab<HeatmapPageIdsType>[] = [
  {
    id: 'heatmap',
  },
  {
    id: 'heatmap-weight',
    disabled: false,
  },
  {
    id: 'other',
    disabled: false,
  },
];

const circlePageIds = ['circle', 'circle-outline', 'other'] as const;
export type CirclePageIdsType = typeof circlePageIds[number];
export const circleTabs: ITab<CirclePageIdsType>[] = [
  {
    id: 'circle',
  },
  {
    id: 'circle-outline',
    disabled: false,
  },
  {
    id: 'other',
    disabled: false,
  },
];

const linePageIds = ['line', 'line-type', 'other'] as const;
export type LinePageIdsType = typeof linePageIds[number];
export const lineTabs: ITab<LinePageIdsType>[] = [
  {
    id: 'line',
  },
  {
    id: 'line-type',
    disabled: false,
  },
  {
    id: 'other',
    disabled: false,
  },
];

const fillPageIds = ['fill', 'fill-outline', 'other'] as const;
export type FillPageIdsType = typeof fillPageIds[number];
export const fillTabs: ITab<FillPageIdsType>[] = [
  {
    id: 'fill',
  },
  {
    id: 'fill-outline',
    disabled: false,
  },
  {
    id: 'other',
    disabled: false,
  },
];

export const DefaultSymbolLayer: Partial<SymbolLayerSpecification> = {
  type: 'symbol',
  layout: {
    'symbol-placement': 'point',
    'symbol-spacing': 800,
    'icon-image': 'empty-e71566',
    'icon-size': 1,
    'icon-allow-overlap': false,
    'icon-ignore-placement': false,
    'text-field': '',
    'text-size': 10,
    'text-font': ['IranSans-Noto'],
    'text-anchor': 'top',
    'text-allow-overlap': false,
    'text-ignore-placement': false,
    'text-max-width': 30,
  },
};

export const DefaultCircleLayer: Partial<CircleLayerSpecification> = {
  type: 'circle',
  paint: {
    'circle-stroke-color': '#2E0767',
    'circle-stroke-width': 1,
    'circle-color': '#E71566',
    'circle-opacity': 0.5,
  },
};

export const DefaultHeatmapLayer: Partial<HeatmapLayerSpecification> = {
  type: 'heatmap',
  paint: {
    'heatmap-weight': 1,
    'heatmap-intensity': 1,
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(33,102,172,0)',
      0.2,
      'rgb(103,169,207)',
      0.4,
      'rgb(209,229,240)',
      0.6,
      'rgb(253,219,199)',
      0.8,
      'rgb(239,138,98)',
      1,
      'rgb(178,24,43)',
    ],
    'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
    'heatmap-opacity': 1,
  },
};

export const DefaultLineLayer: Partial<LineLayerSpecification> = {
  type: 'line',
  layout: {
    'line-cap': 'round',
    'line-join': 'miter',
  },
  paint: {
    'line-width': 5,
    'line-color': '#2E0767',
    'line-translate': [0, 0],
  },
};

export const DefaultFillLayer: Partial<FillLayerSpecification> = {
  type: 'fill',
  paint: {
    'fill-outline-color': '#2E0767',
    'fill-color': '#E71566',
    'fill-opacity': 0.1,
  },
};
