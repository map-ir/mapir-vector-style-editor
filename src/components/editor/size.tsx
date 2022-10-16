/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components/macro';
import { useAtomValue, useSetAtom } from 'jotai';

import InputNumber from 'common/input-number';
import useGetSelectedLayer from 'hooks/useGetSelectedLayer';
import updateStyle from 'common/utils/update-style';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from 'common/select';

import { mapState, selectedLayerIDState, styleObjState } from 'atoms/map';

import { Row } from 'common/styles';

const SetSize = () => {
  const map = useAtomValue(mapState);
  const openLayerID = useAtomValue(selectedLayerIDState);
  const setStyleObj = useSetAtom(styleObjState);

  const { layer } = useGetSelectedLayer();

  const [property, setProperty] = useState<string | undefined>(undefined);
  // @ts-ignore line
  const [size, setSize] = useState<number>(layer?.layout?.[property] ?? 1);

  useEffect(() => {
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

  return (
    <Row>
      <Selector>
        <FormattedMessage id="size_base_on" />
        {/* <Select>
          <option>مقدار ثابت</option>
        </Select> */}
        <Select>
          <SelectTrigger aria-label="Food">
            <SelectValue placeholder="Select a fruit…" />
            <SelectIcon></SelectIcon>
          </SelectTrigger>
          <SelectContent>
            <SelectViewport>
              <SelectItem value="static">
                <SelectItemText>مقدار ثابت</SelectItemText>
                <SelectItemIndicator></SelectItemIndicator>
              </SelectItem>
            </SelectViewport>
          </SelectContent>
        </Select>
      </Selector>
      <InputNumber
        min={1}
        max={5}
        value={size}
        onChange={(number: number) => {
          setSize(number);
          if (property && openLayerID && map)
            updateStyle(
              openLayerID,
              map,
              'layout',
              property,
              number,
              setStyleObj
            );
        }}
      />
    </Row>
  );
};

export default SetSize;

const Selector = styled(Row)`
  justify-content: start;
  gap: 1em;
  padding: 0;
`;
