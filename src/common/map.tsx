import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import maplibre from 'maplibre-gl';
import { useAtom, useAtomValue } from 'jotai';

import { mapState, isMapLoadedState, styleObjState } from '../atoms/map';

import type { MapOptions } from '../types/map';

// import urlRTL from './../libs/maplibre-gl-rtl-text-v0.2.3.js';

import 'maplibre-gl/dist/maplibre-gl.css';

if (maplibre.getRTLTextPluginStatus() === 'unavailable')
  maplibre.setRTLTextPlugin(
    'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
    (err) => {
      if (err) console.error(err);
    },
    true
  );

interface IProps {
  options: MapOptions;
}

export default function Map({ options: mapOptions }: IProps) {
  const [map, setMap] = useAtom(mapState);
  const [isMapLoaded, setIsMapLoaded] = useAtom(isMapLoadedState);
  const styleObj = useAtomValue(styleObjState);

  const mapRef = useRef<HTMLDivElement | null>(null);

  // initialize the map
  useEffect(() => {
    if (map) return;

    const options = Object.assign(
      /// default map options
      {
        style: 'https://map.ir/vector/styles/main/mapir-Dove-style.json',
        center: [54.82, 31.77],
        zoom: 5,
        pitch: 0,
        hash: true,
        attributionControl: true,
        customAttribution: `${
          (mapOptions?.customAttribution ?? '') as string
        } © Map.ir © Openstreetmap`,
      },
      mapOptions
    );

    const futureMap = new maplibre.Map({
      container: mapRef.current || '',
      ...options,
    });

    futureMap.on('load', () => {
      futureMap.resize();
      setIsMapLoaded(true);
    });

    setMap?.(futureMap);
  }, [map, setMap]);

  // Show the layers on Map
  useEffect(() => {
    if (map && isMapLoaded && styleObj) {
      const srcName = Object.keys(styleObj.sources)[0];
      const srcData = styleObj.sources[Object.keys(styleObj.sources)[0]];
      const layersStyle = styleObj.layers;
      if (!map.getSource(srcName)) {
        map.addSource(srcName, srcData);
      }
      for (const layerStyle of layersStyle) {
        if (!map.getLayer(layerStyle.id)) {
          try {
            map.addLayer(layerStyle);
          } catch (err) {
            console.error(err);
          }
        }
      }
    }
  }, [map, isMapLoaded, styleObj]);

  return (
    <MapWrapper>
      <div id="style-editor-map" ref={mapRef}></div>
    </MapWrapper>
  );
}

const MapWrapper = styled.div`
  position: relative;
  height: 100%;
  /* flex-grow: 2.5; */
  width: 70%;
  overflow: hidden;
  border-radius: var(--SE-radius-16);

  #style-editor-map {
    width: 100%;
    height: 100%;
    background-color: #eff0f0;
    direction: ltr;
  }
`;
