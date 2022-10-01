import React, { memo } from 'react';
import { Provider, useSetAtom } from 'jotai';

import Map from './map';

import { mapPropsState } from '../atoms/map';

import type { MapProps } from 'types/map';

interface IProps {
  map: MapProps;
}

const App = ({ map }: IProps) => {
  const setMapProp = useSetAtom(mapPropsState);

  setMapProp(map);

  return <Map />;
};

export default memo(App);
