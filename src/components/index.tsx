import React from 'react';
import { Provider } from 'jotai';
import App from './app';

import type { MapProps } from 'types/map';

interface IProps {
  map: MapProps;
}

const MapirStyleEditor = ({ map }: IProps) => {
  return (
    <Provider>
      <App map={map} />
    </Provider>
  );
};

export default MapirStyleEditor;
