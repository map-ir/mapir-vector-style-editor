import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import mapboxGl from 'mapbox-gl';
import { useAtom, useSetAtom, useAtomValue } from 'jotai';

import { mapState, isMapLoadedState, mapPropsState } from '../atoms/map';

import type { ResourceType } from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

export default function Map() {
  const [map, setMap] = useAtom(mapState);
  const setIsMapLoaded = useSetAtom(isMapLoadedState);
  const mapProps = useAtomValue(mapPropsState);
  console.log(
    '🚀 ~ file: map.tsx ~ line 13 ~ Map ~ mapProps',
    mapProps?.transformRequest
  );

  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (map) return;

    if (mapboxGl.getRTLTextPluginStatus() === 'unavailable')
      mapboxGl.setRTLTextPlugin(
        './../libs/mapbox-gl-rtl-text-v0.2.3.js',
        (err) => {
          err && console.error(err);
        },
        true
      );

    const futureMap = new mapboxGl.Map({
      ...mapProps,
      container: mapRef.current || '',
      style:
        mapProps?.style ??
        'https://map.ir/vector/styles/main/mapir-Dove-style.json',
      center: mapProps?.center ?? [54.82, 31.77],
      zoom: mapProps?.zoom ?? 5,
      pitch: mapProps?.pitch ?? 0,
      hash: mapProps?.hash ?? true,
      attributionControl: true,
      customAttribution:
        (mapProps?.customAttribution ?? '') + '© Map.ir © Openstreetmap',
      transformRequest: (url: string, resourceType: ResourceType) =>
        mapProps?.transformRequest(url, resourceType),
    });

    futureMap.on('load', () => {
      futureMap.resize();
      setIsMapLoaded(true);
    });

    setMap?.(futureMap);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, setMap]);

  return (
    <MapWrapper>
      <div id="map" ref={mapRef}></div>
    </MapWrapper>
  );
}

const MapWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: inherit;

  #map {
    width: 100%;
    height: 100%;
    background-color: #eff0f0;

    @media (prefers-color-scheme: dark) {
      background-color: #4a5768;
    }
  }
`;
