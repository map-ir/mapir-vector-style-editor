import React from 'react';

import SetIcon from './point/symbol-icon';
import BaseOn from './editor/base-on';
import SetOpacity from './editor/opacity';
import SetLineType from './editor/line-type';
import SetTitle from './editor/title';

import type { CircleLayer, FillLayer, LineLayer, SymbolLayer } from 'mapbox-gl';

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

const circlePageIds = ['circle', 'outline', 'title', 'other'] as const;
export type CirclePageIdsType = typeof circlePageIds[number];
export const circleTabs: ITab<CirclePageIdsType>[] = [
  {
    id: 'circle',
  },
  {
    id: 'outline',
    disabled: false,
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

const linePageIds = ['line', 'line-type', 'title', 'other'] as const;
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
    id: 'title',
    disabled: false,
  },
  {
    id: 'other',
    disabled: false,
  },
];

const fillPageIds = ['fill', 'fill-outline', 'title', 'other'] as const;
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
    id: 'title',
    disabled: false,
  },
  {
    id: 'other',
    disabled: false,
  },
];

export const components: Record<string, JSX.Element> = {
  symbol: (
    <>
      <SetIcon />
      <BaseOn type="size" />
    </>
  ),
  circle: (
    <>
      <BaseOn type="size" />
      <BaseOn type="color" />
    </>
  ),
  line: (
    <>
      <BaseOn type="size" />
      <BaseOn type="color" />
    </>
  ),
  fill: <BaseOn type="color" />,
  outline: (
    <>
      <BaseOn type="stroke" />
      <BaseOn type="color" />
    </>
  ),
  'fill-outline': (
    <>
      <BaseOn type="stroke-color" />
    </>
  ),
  other: <SetOpacity />,
  title: <SetTitle />,
  'line-type': <SetLineType />,
};

export const DefaultSymbolLayer: Partial<SymbolLayer> = {
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

export const DefaultTextLayer: Partial<SymbolLayer> = {
  type: 'symbol',
  layout: {
    'symbol-placement': 'point',
    'symbol-spacing': 800,
    'text-field': '',
    'text-size': 16,
    'text-font': ['IranSans-Noto'],
    'text-anchor': 'top',
    'text-allow-overlap': false,
    'text-ignore-placement': false,
    'text-max-width': 30,
  },
};

export const DefaultCircleLayer: Partial<CircleLayer> = {
  type: 'circle',
  paint: {
    'circle-stroke-color': '#2E0767',
    'circle-stroke-width': 1,
    'circle-color': '#E71566',
    'circle-opacity': 0.5,
  },
};

export const DefaultLineLayer: Partial<LineLayer> = {
  type: 'line',
  layout: {
    'line-cap': 'round',
    'line-join': 'miter',
  },
  paint: {
    'line-width': ['interpolate', ['exponential', 1.5], ['zoom'], 1, 2, 18, 44],
    'line-color': '#2E0767',
    'line-translate': [0, 0],
  },
};

export const DefaultFillLayer: Partial<FillLayer> = {
  type: 'fill',
  paint: {
    'fill-outline-color': '#2E0767',
    'fill-color': '#E71566',
    'fill-opacity': 0.1,
  },
};
