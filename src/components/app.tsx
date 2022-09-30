import React, { memo } from 'react';
import { Provider, useSetAtom } from 'jotai';

import Map from './map';

import { mapPropsState } from '../atoms/map';

import type { MapProps } from 'types/map';

interface IProps {
  map: MapProps;
}

const MapirStyleEditor = ({ map }: IProps) => {
  console.log('🚀 ~ file: app.tsx ~ line 15 ~ MapirStyleEditor ~ map', map);
  const setMapProp = useSetAtom(mapPropsState);

  setMapProp(map);

  return (
    <Provider>
      <Map />
    </Provider>
  );
};

export default memo(MapirStyleEditor);
