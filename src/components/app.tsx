import React, { memo, useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import styled from 'styled-components/macro';

import Map from '../common/map';
import Editor from './layers';

import {
  mapPropsState,
  styleURLState,
  styleObjState,
  spriteState,
} from '../atoms/map';
import { titleState, columnsState } from '../atoms/general';

import type { IProps } from 'types/general';
import type { Style } from 'mapbox-gl';

const App = ({
  map,
  locale,
  styleURL,
  sprite,
  title,
  columns,
  onSubmit,
}: IProps) => {
  const setMapProp = useSetAtom(mapPropsState);
  const [styleURLAtom, setStyleURL] = useAtom(styleURLState);
  const setStyleObj = useSetAtom(styleObjState);
  const setTitle = useSetAtom(titleState);
  const setColumns = useSetAtom(columnsState);
  const setSprite = useSetAtom(spriteState);

  setMapProp(map);

  useEffect(() => {
    void setStyleURL(styleURL);
  }, [styleURL]);

  useEffect(() => {
    setSprite(sprite);
  }, [sprite]);

  useEffect(() => {
    setTitle(title);
  }, [title]);

  useEffect(() => {
    setColumns(columns);
  }, [columns]);

  const fetchStyle = (url: string) => {
    return fetch(url, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res: Style) => res);
  };

  useEffect(() => {
    if (styleURLAtom)
      void fetchStyle(styleURLAtom).then((res) => setStyleObj(res));
  }, [styleURLAtom, setStyleObj]);

  return (
    <Wrapper>
      <Editor onSubmit={onSubmit} />
      <Map />
    </Wrapper>
  );
};

export default memo(App);

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  gap: 1em;
  font-family: var(--font-family);
`;
