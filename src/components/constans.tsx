import React from 'react';

const symbolPageIds = ['symbol', 'other', 'title'] as const;
export type SymbolPageIdsType = typeof symbolPageIds[number];
export const symbolTabs = [
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

const circlePageIds = ['cirle', 'outline', 'title', 'other'] as const;
export type CirclePageIdsType = typeof circlePageIds[number];
export const circleTabs = [
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

export const components: Record<string, JSX.Element> = {
  symbol: <div>icon</div>,
  circle: <div>circle</div>,
  outline: <div>outline</div>,
  other: <div>other</div>,
  title: <div>title</div>,
};
