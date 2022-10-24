import React from 'react';

import SetIcon from './point/symbol-icon';
import BaseOn from './editor/base-on';

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
  other: <div>other</div>,
  title: <div>title</div>,
};
