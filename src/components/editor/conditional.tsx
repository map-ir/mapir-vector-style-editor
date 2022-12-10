/* eslint-disable @typescript-eslint/indent */
import React, { useState, useEffect, useCallback } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { FormattedMessage, useIntl } from 'react-intl';

import useGetStyleKey from 'hooks/useGetStyleKey';
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
import InputNumber from 'common/input-number';
import Gradiant from 'common/gradiant';
import ColorPicker from 'common/color-picker';

import {
  Column,
  Selector,
  Label,
  PairsWrap,
  StyledRow,
  Description,
  Star,
} from 'common/styles';

import { ReactComponent as Arrow } from '../../assets/icons/arrow-down.svg';
import { ReactComponent as Check } from '../../assets/icons/tick.svg';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';

import {
  layerState,
  mapState,
  selectedLayerIDState,
  styleObjState,
} from 'atoms/map';
import { columnsState } from 'atoms/general';

import type { Expression, StyleFunction } from 'mapbox-gl';

interface IProps {
  type:
    | 'size'
    | 'color'
    | 'stroke'
    | 'stroke-color'
    | 'stroke-size'
    | 'stroke-opacity';
}

const Conditional = ({ type }: IProps) => {
  const intl = useIntl();

  const map = useAtomValue(mapState);
  const openLayerID = useAtomValue(selectedLayerIDState);
  const setStyleObj = useSetAtom(styleObjState);
  const columns = useAtomValue(columnsState);
  const layer = useAtomValue(layerState);

  const { styleKey, property } = useGetStyleKey(type);

  const [pairs, setPairs] = useState<(number | string)[][]>([]); // Pairs of zoom/value or zoom/color

  useEffect(() => {
    // @ts-ignore line
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const expression = layer?.[styleKey]?.[property];
    const minzoom = layer?.minzoom ?? 1;
    const maxzoom = layer?.maxzoom ?? 20;

    if ((expression as string[])?.[0] === 'match') {
      console.log(
        '🚀 ~ file: conditional.tsx:91 ~ useEffect ~ expression',
        (expression as string[])?.[1]?.[1]
      );
    } else {
      setPairs([
        [
          minzoom,
          expression ??
            (['color', 'stroke-color'].includes(type) ? '#C11010' : 1),
        ],
        [maxzoom, ['color', 'stroke-color'].includes(type) ? '#000000' : 1],
      ]);
    }
  }, [layer, property, styleKey]);

  const styleValue = useCallback(
    (value: (number | string)[][]) => [
      'match',
      ['get', value],
      ...value.flat(),
    ],
    []
  );

  const applyStyles = useCallback(
    (value: number | Expression | StyleFunction) => {
      if (openLayerID && map && property && styleKey && pairs.length > 0) {
        updateStyle(openLayerID, map, styleKey, property, value, setStyleObj);
      }
    },
    [openLayerID, map, styleKey, property]
  );

  return (
    <Column style={{ width: '100%' }}>
      <Selector>
        <Label>
          <FormattedMessage id="value_title" />
        </Label>
        <Select
          dir={intl.locale === 'fa' ? 'rtl' : 'ltr'}
          onValueChange={(value) => {
            if (property && styleKey && openLayerID && map)
              updateStyle(
                openLayerID,
                map,
                styleKey,
                property,
                ['match', ['get', value], '#000000'],
                setStyleObj
              );
          }}
        >
          <SelectTrigger aria-label={intl.formatMessage({ id: 'value_title' })}>
            <SelectValue
              placeholder={intl.formatMessage({ id: 'selection' })}
            />
            <SelectIcon>
              <Arrow />
            </SelectIcon>
          </SelectTrigger>
          <SelectContent>
            <SelectViewport>
              {columns?.map((column) => (
                <SelectItem key={column} value={column}>
                  <SelectItemText>{column}</SelectItemText>
                  <SelectItemIndicator>
                    <Check />
                  </SelectItemIndicator>
                </SelectItem>
              ))}
            </SelectViewport>
          </SelectContent>
        </Select>
      </Selector>
      <Column>
        <StyledRow>
          {['color', 'stroke-color'].includes(type) ? (
            <Gradiant
              pairs={pairs}
              min={layer?.minzoom ?? 1}
              max={layer?.maxzoom ?? 20}
              disabled
            />
          ) : (
            <Description>
              <Star>*</Star>
              <FormattedMessage id="size" /> : <FormattedMessage id="zoom" />
            </Description>
          )}
          <Plus
            style={{ cursor: 'pointer' }}
            color={'var(--SE-color-primary)'}
            onClick={() => {
              const temp = [...pairs];
              temp.push([
                Math.floor(
                  ((temp[0][0] as number) + (temp[1][0] as number)) / 2
                ),
                ['color', 'stroke-color'].includes(type) ? '#FFB800' : 1,
              ]);
              const arg = styleValue(
                temp.sort((a, b) => (a[0] as number) - (b[0] as number))
              ) as number | Expression | StyleFunction;
              applyStyles(arg);
            }}
          />
        </StyledRow>
        {pairs?.map((pair, index) => (
          <StyledRow key={index}>
            <PairsWrap>
              {['color', 'stroke-color'].includes(type) ? (
                // <Sample color={pair?.[1] as string} />
                <ColorPicker
                  value={pair?.[1]}
                  onChange={(e) => {
                    const temp = [...pairs];
                    temp[index] = [
                      temp[index][0],
                      e.target.value.toUpperCase(),
                    ];
                    const arg = styleValue(temp) as
                      | number
                      | Expression
                      | StyleFunction;
                    applyStyles(arg);
                  }}
                />
              ) : (
                <InputNumber
                  value={pair?.[1] as number}
                  onChange={(value) => {
                    const temp = [...pairs];
                    temp[index] = [temp[index][0], value];
                    const arg = styleValue(temp) as
                      | number
                      | Expression
                      | StyleFunction;
                    applyStyles(arg);
                  }}
                />
              )}{' '}
              {/* value or color */}:
              <Select
                dir={intl.locale === 'fa' ? 'rtl' : 'ltr'}
                onValueChange={(value) => {
                  if (property && styleKey && openLayerID && map)
                    updateStyle(
                      openLayerID,
                      map,
                      styleKey,
                      property,
                      ['match', ['get', value], '#000000'],
                      setStyleObj
                    );
                }}
              >
                <SelectTrigger
                  aria-label={intl.formatMessage({ id: 'value_title' })}
                >
                  <SelectValue
                    placeholder={intl.formatMessage({ id: 'selection' })}
                  />
                  <SelectIcon>
                    <Arrow />
                  </SelectIcon>
                </SelectTrigger>
                <SelectContent>
                  <SelectViewport>
                    {columns?.map((column) => (
                      <SelectItem key={column} value={column}>
                        <SelectItemText>{column}</SelectItemText>
                        <SelectItemIndicator>
                          <Check />
                        </SelectItemIndicator>
                      </SelectItem>
                    ))}
                  </SelectViewport>
                </SelectContent>
              </Select>{' '}
              {/* zoom */}
            </PairsWrap>
            <Delete
              style={{ cursor: pairs.length < 3 ? 'not-allowed' : 'pointer' }}
              color={
                pairs.length < 3
                  ? 'var(--SE-shade-3)'
                  : 'var(--SE-color-primary)'
              }
              onClick={() => {
                if (pairs.length < 3) return;
                const temp = pairs?.filter((c, index2) => index !== index2);
                const arg = styleValue(temp) as
                  | number
                  | Expression
                  | StyleFunction;
                applyStyles(arg);
              }}
            />
          </StyledRow>
        ))}
      </Column>
    </Column>
  );
};

export default Conditional;
