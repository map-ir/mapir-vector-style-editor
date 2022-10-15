/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components/macro';
import { useAtomValue, useSetAtom } from 'jotai';

import InputNumber from 'common/input-number';
import useGetSelectedLayer from 'hooks/useGetSelectedLayer';
import updateStyle from 'common/utils/update-style';

import { mapState, selectedLayerIDState, styleObjState } from 'atoms/map';

import { Select } from 'common/styles';

const SetSize = () => {
  const map = useAtomValue(mapState);
  const openLayerID = useAtomValue(selectedLayerIDState);
  const setStyleObj = useSetAtom(styleObjState);

  const { layer } = useGetSelectedLayer();

  const [property, setProperty] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log('🚀 ~ file: size.tsx ~ line 20 ~ SetSize ~ layer', layer);
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
  }, [layer]);

  useEffect(() => {
    console.log('🚀 ~ file: size.tsx ~ line 43 ~ SetSize ~ property', property);
  }, [property]);

  const func = useCallback(
    (number: number) => {
      console.log(
        '🚀 ~ file: size.tsx ~ line 47 ~ SetSize ~ property',
        property
      );
      if (property && openLayerID && map)
        updateStyle(openLayerID, map, 'layout', property, number, setStyleObj);
    },
    [property, openLayerID, map]
  );

  return (
    <Row>
      <Selector>
        <FormattedMessage id="size_base_on" />
        <Select>
          <option>مقدار ثابت</option>
        </Select>
      </Selector>
      <InputNumber
        min={1}
        max={5}
        // @ts-ignore line
        defaultValue={layer?.layout?.[property]}
        onChange={(number) => {
          func(number);
        }}
      />
    </Row>
  );
};

export default SetSize;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Selector = styled(Row)`
  justify-content: start;
  gap: 1em;
`;
