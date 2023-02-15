import React from 'react';

import SetIcon from '../point/symbol-icon';
import BaseOn from './base-on';
import SetOpacity from './opacity';
import SetLineType from './line-type';
import SetTitle from './title';

export const editorComponents: Record<string, JSX.Element> = {
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
  heatmap: (
    <>
      <BaseOn type="size" />
      <BaseOn type="color" />
    </>
  ),
  'heatmap-weight': (
    <>
      <BaseOn type="weight" />
      <BaseOn type="intensity" />
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
  'circle-outline': (
    <>
      <BaseOn type="stroke-size" />
      <BaseOn type="stroke-color" />
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
