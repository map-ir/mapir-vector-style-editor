/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import useGetSelectedLayer from './useGetSelectedLayer';

const useGetStyleKey = (type: string) => {
  const { layer } = useGetSelectedLayer();

  const [property, setProperty] = useState<
    | 'icon-size'
    | 'circle-radius'
    | 'line-width'
    | 'fill-color'
    | 'fill-outline-color'
    | 'line-color'
    | 'circle-radius'
    | 'circle-color'
    | 'circle-stroke-width'
    | 'circle-stroke-color'
  >();

  const [styleKey, setStyleKey] = useState<'layout' | 'zoom' | 'paint'>();

  useEffect(() => {
    if (type === 'stroke') {
      switch (layer?.type) {
        case 'fill':
          setProperty('fill-outline-color');
          break;
        case 'circle':
          setProperty('circle-stroke-width');
          break;
      }
    }
    if (type === 'size') {
      switch (layer?.type) {
        case 'symbol':
          setProperty('icon-size');
          break;
        case 'circle':
          setProperty('circle-radius');
          break;
        case 'line':
          setProperty('line-width');
          break;
      }
    }
    if (type === 'color') {
      switch (layer?.type) {
        case 'fill':
          setProperty('fill-color');
          break;
        case 'circle':
          setProperty('circle-color');
          break;
        case 'line':
          setProperty('line-color');
          break;
      }
    }
  }, [layer]);

  useEffect(() => {
    if (property)
      setStyleKey(['icon-size'].includes(property) ? 'layout' : 'paint');
  }, [property]);

  return { styleKey, property };
};

export default useGetStyleKey;
