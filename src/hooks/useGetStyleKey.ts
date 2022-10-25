/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import useGetSelectedLayer from './useGetSelectedLayer';

const useGetStyleKey = (type: string) => {
  const { layer } = useGetSelectedLayer();

  const [property, setProperty] = useState<
    | 'icon-size'
    | 'circle-radius'
    | 'line-width'
    | 'stroke-width'
    | 'fill-color'
    | 'circle-color'
    | 'line-color'
  >();

  const [styleKey, setStyleKey] = useState<'layout' | 'zoom' | 'paint'>();

  useEffect(() => {
    if (type === 'stroke') {
      switch (layer?.type) {
        case 'circle':
          setProperty('stroke-width');
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
    console.log(
      '🚀 ~ file: useGetStyleKey.ts ~ line 67 ~ useGetStyleKey ~ property',
      property
    );
    if (property)
      setStyleKey(
        ['icon-size', 'circle-radius', 'line-width', 'stroke-width'].includes(
          property
        )
          ? 'layout'
          : 'paint'
      );
  }, [property]);

  return { styleKey, property };
};

export default useGetStyleKey;
