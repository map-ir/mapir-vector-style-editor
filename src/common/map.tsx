import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  Map as MapGL,
  getRTLTextPluginStatus,
  setRTLTextPlugin,
} from 'mapbox-gl';
import { useAtom, useAtomValue } from 'jotai';

import {
  mapState,
  isMapLoadedState,
  mapPropsState,
  styleObjState,
} from '../atoms/map';

import type { ResourceType } from 'mapbox-gl';

// import urlRTL from './../libs/mapbox-gl-rtl-text-v0.2.3.js';

import 'mapbox-gl/dist/mapbox-gl.css';

export default function Map() {
  const [map, setMap] = useAtom(mapState);
  const [isMapLoaded, setIsMapLoaded] = useAtom(isMapLoadedState);
  const mapProps = useAtomValue(mapPropsState);
  const styleObj = useAtomValue(styleObjState);

  const mapRef = useRef<HTMLDivElement | null>(null);

  // initialize the map
  useEffect(() => {
    if (map) return;

    if (getRTLTextPluginStatus() === 'unavailable')
      setRTLTextPlugin(
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
        (err) => {
          if (err) console.error(err);
        },
        true
      );

    const futureMap = new MapGL({
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
      customAttribution: `${
        (mapProps?.customAttribution ?? '') as string
      } © Map.ir © Openstreetmap`,
      transformRequest: (url: string, resourceType: ResourceType) =>
        mapProps?.transformRequest(url, resourceType),
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
        if (!map.getLayer(layerStyle.id)) map.addLayer(layerStyle);
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
