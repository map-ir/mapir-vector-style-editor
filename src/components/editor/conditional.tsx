/* eslint-disable @typescript-eslint/indent */
import React, { useState, useEffect, useCallback } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components/macro';

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
// import Gradiant from 'common/gradiant';
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
import { splitArray } from 'common/utils';

import { ReactComponent as Arrow } from '../../assets/icons/arrow-down.svg';
import { ReactComponent as Check } from '../../assets/icons/tick.svg';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { ReactComponent as Step } from '../../assets/icons/step.svg';
import { ReactComponent as Match } from '../../assets/icons/match.svg';

import {
  layerState,
  mapState,
  selectedLayerIDState,
  styleObjState,
} from 'atoms/map';
import { columnsState, distictState } from 'atoms/general';

import type { Expression, ExpressionName, StyleFunction } from 'mapbox-gl';

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
  const distictFunc = useAtomValue(distictState);
  const layer = useAtomValue(layerState);

  const { styleKey, property } = useGetStyleKey(type);

  const [conditionType, setCondition] = useState<ExpressionName>('match');
  const [pairs, setPairs] = useState<(number | string)[][]>([]); // Pairs of zoom/value or zoom/color
  const [colName, setColName] = useState<string>();
  const [distinctValues, setDisticts] = useState<string[]>([]);

  useEffect(() => {
    // @ts-ignore line
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const expression = layer?.[styleKey]?.[property];
    const minzoom = layer?.minzoom ?? 1;
    const maxzoom = layer?.maxzoom ?? 20;

    if (
      (expression as string[])?.[0] === 'match' ||
      (expression as string[])?.[0] === 'step'
    ) {
      setCondition((expression as string[])?.[0] as ExpressionName);
      setColName((expression as string[])?.[1]?.[1]);
      setPairs(
        splitArray(
          conditionType === 'step'
            ? (expression as string[])?.slice(2).reverse()
            : (expression as string[])?.slice(2),
          2
        )
      );
    } else {
      setPairs([
        [
          minzoom,
          expression ??
            (['color', 'stroke-color'].includes(type) ? '#C11010' : 1),
        ],
        [maxzoom, ['color', 'stroke-color'].includes(type) ? '#2585f3' : 1],
        [['color', 'stroke-color'].includes(type) ? '#000000' : 1],
      ]);
    }
  }, [layer, property, styleKey]);

  const styleValue = useCallback(
    (value: (number | string)[][]) => [
      conditionType,
      ['get', colName],
      ...(conditionType === 'step' ? value.flat().reverse() : value.flat()),
    ],
    [colName, conditionType]
  );

  const applyStyles = useCallback(
    (value: number | Expression | StyleFunction) => {
      if (openLayerID && map && property && styleKey && pairs.length > 0) {
        updateStyle(openLayerID, map, styleKey, property, value, setStyleObj);
      }
    },
    [openLayerID, map, styleKey, property]
  );

  useEffect(() => {
    if (colName)
      void distictFunc?.(colName).then((res: string[]) => {
        setDisticts(res);
        const arg = styleValue(pairs) as number | Expression | StyleFunction;
        applyStyles(arg);
      });
  }, [colName]);

  useEffect(() => {
    const arg = styleValue(pairs) as number | Expression | StyleFunction;
    applyStyles(arg);
  }, [conditionType]);

  return (
    <Column style={{ width: '100%' }}>
      <StyledRow>
        <Selector>
          <Label>
            <FormattedMessage id="value_title" />
          </Label>
          <Select
            dir={intl.locale === 'fa' ? 'rtl' : 'ltr'}
            defaultValue={colName}
            value={colName}
            onValueChange={(value) => {
              setColName(value);
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
          </Select>
        </Selector>
        <StyledRow>
          <IconWrapper title="step">
            <Step
              width={30}
              color={
                conditionType === 'step'
                  ? 'var(--SE-color-primary)'
                  : 'var(--SE-shade-2)'
              }
              onClick={() => {
                setCondition('step');
              }}
            />
          </IconWrapper>
          <IconWrapper title="match">
            <Match
              width={30}
              color={
                conditionType === 'match'
                  ? 'var(--SE-color-primary)'
                  : 'var(--SE-shade-2)'
              }
              onClick={() => {
                setCondition('match');
              }}
            />
          </IconWrapper>
        </StyledRow>
      </StyledRow>
      <Column>
        <StyledRow>
          {/* {['color', 'stroke-color'].includes(type) ? (
            <Gradiant
              pairs={pairs}
              min={layer?.minzoom ?? 1}
              max={layer?.maxzoom ?? 20}
              disabled
            />
          ) : (
          )} */}
          <Description>
            <Star>*</Star>
            <FormattedMessage id="size" /> : <FormattedMessage id="value" />
          </Description>
          <Plus
            style={{ cursor: 'pointer' }}
            color={'var(--SE-color-primary)'}
            onClick={() => {
              const temp = [...pairs];
              temp.splice(pairs?.length - 1, 0, [
                'asas',
                ['color', 'stroke-color'].includes(type) ? '#FFB800' : 1,
              ]);
              const arg = styleValue(temp) as
                | number
                | Expression
                | StyleFunction;
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
                  value={pair?.[1] ?? pair?.[0]}
                  onChange={(e) => {
                    const temp = [...pairs];
                    temp[index] = !pair?.[1]
                      ? [e.target.value.toUpperCase()]
                      : [temp[index][0], e.target.value.toUpperCase()];
                    const arg = styleValue(temp) as
                      | number
                      | Expression
                      | StyleFunction;
                    applyStyles(arg);
                  }}
                />
              ) : (
                <InputNumber
                  value={(pair?.[1] ?? pair?.[0]) as number}
                  onChange={(value) => {
                    const temp = [...pairs];
                    temp[index] = !pair?.[1]
                      ? [value]
                      : [temp[index][0], value];
                    const arg = styleValue(temp) as
                      | number
                      | Expression
                      | StyleFunction;
                    applyStyles(arg);
                  }}
                />
              )}{' '}
              {/* value or color */}:
              {!pair?.[1] ? (
                <div>
                  <FormattedMessage id="default" />
                </div>
              ) : (
                <Select
                  dir={intl.locale === 'fa' ? 'rtl' : 'ltr'}
                  defaultValue={pair?.[0] as string}
                  value={pair?.[0] as string}
                  onValueChange={(value) => {
                    const temp = [...pairs];
                    temp[index] = [value, temp[index][1]];
                    const arg = styleValue(temp) as
                      | number
                      | Expression
                      | StyleFunction;
                    applyStyles(arg);
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
                      {distinctValues?.map((dv) => (
                        <SelectItem key={dv} value={dv}>
                          <SelectItemText>{dv}</SelectItemText>
                          <SelectItemIndicator>
                            <Check />
                          </SelectItemIndicator>
                        </SelectItem>
                      ))}
                    </SelectViewport>
                  </SelectContent>
                </Select>
              )}{' '}
              {/* zoom */}
            </PairsWrap>
            {pair?.[1] ? (
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
            ) : null}
          </StyledRow>
        ))}
      </Column>
    </Column>
  );
};

export default Conditional;

const IconWrapper = styled.div`
  cursor: pointer;
  display: flex;
`;
