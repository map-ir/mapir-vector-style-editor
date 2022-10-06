const symbolPageIds = ['symbol', 'other', 'title'] as const;
export type SymbolPageIdsType = typeof symbolPageIds[number];

export const symbolTabs = [
  {
    id: 'symbol',
  },
  {
    id: 'other',
    disabled: false,
  },
  {
    id: 'title',
    disabled: false,
  },
];
