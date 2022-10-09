import React from 'react';

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

export const components: Record<string, JSX.Element> = {
  symbol: <div>icon</div>,
  circle: <div>circle</div>,
  outline: <div>outline</div>,
  other: <div>other</div>,
  title: <div>title</div>,
};
