import React, { memo, useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import styled from 'styled-components';

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

const defaultColors = {
  primary: '#ea4c89',
  primary_20: '#ea4c8920',
  secondry: '#2e0767',
  shade_1: '#1c1c1c',
  shade_2: '#808080',
  shade_3: '#C2C2C2',
  shade_4: '#E8E8E8',
  shade_5: '#E0E0E0',
  light_1: '#ffffff',
  light_2: '#FAFAFA',
  success_1: '#20A76E',
  fail_1: '#D10328',
  border_radius_16: '16px',
  border_radius_8: '8px',
  border_radius_4: '4px',
  font_family:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
};

const App = memo(
  ({
    map,
    locale,
    styleURL,
    sprite,
    title,
    columns,
    onSubmit,
    onCancle,
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
      <Wrapper locale={locale ?? 'en'}>
        <Editor onSubmit={onSubmit} onCancle={onCancle} />
        <Map />
      </Wrapper>
    );
  }
);

export default App;

const Wrapper = styled.div<{ locale: string }>`
  direction: ${(p) => (p.locale === 'fa' ? 'rtl' : 'ltr')};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  gap: 1em;
  font-family: var(--font-family);

  --color-primary: ${defaultColors.primary};
  --color-primary-20: ${defaultColors.primary_20};
  --color-secondry: ${defaultColors.secondry};
  --shade-1: ${defaultColors.shade_1};
  --shade-2: ${defaultColors.shade_2};
  --shade-3: ${defaultColors.shade_3};
  --shade-4: ${defaultColors.shade_4};
  --shade-5: ${defaultColors.shade_5};
  --light-1: ${defaultColors.light_1};
  --light-2: ${defaultColors.light_2};
  --success-1: ${defaultColors.success_1};
  --fail-1: ${defaultColors.fail_1};
  --radius-16: ${defaultColors.border_radius_16};
  --radius-8: ${defaultColors.border_radius_8};
  --radius-4: ${defaultColors.border_radius_4};

  --font-family: ${defaultColors.font_family};
`;
