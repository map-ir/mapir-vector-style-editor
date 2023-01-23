/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { memo, useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useAtomValue, useSetAtom } from 'jotai';

import useGetStyleKey from 'hooks/useGetStyleKey';
import updateStyle from 'common/utils/update-style';
import ZoomBase from './zoom-base';
import Conditional from './conditional';
import InputNumber from 'common/input-number';
import ColorPicker from 'common/color-picker';
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

import {
  layerState,
  mapState,
  selectedLayerIDState,
  styleObjState,
} from 'atoms/map';
import { columnsState, distinctState } from 'atoms/general';

import { Row, Column, Selector, Label } from 'common/styles';

import { ReactComponent as Arrow } from '../../assets/icons/arrow-down.svg';
import { ReactComponent as Check } from '../../assets/icons/tick.svg';

const options = ['static', 'dynamic', 'zoom', 'conditional'] as const;
type OptionsType = typeof options[number];

interface IProps {
  type:
    | 'size'
    | 'color'
    | 'stroke'
    | 'stroke-color'
    | 'stroke-size'
    | 'stroke-opacity';
}

const BaseOn = ({ type }: IProps) => {
  const intl = useIntl();
  const map = useAtomValue(mapState);
  const openLayerID = useAtomValue(selectedLayerIDState);
  const setStyleObj = useSetAtom(styleObjState);
  const columns = useAtomValue(columnsState);
  const distinctFunc = useAtomValue(distinctState);
  const layer = useAtomValue(layerState);

  const { styleKey, property } = useGetStyleKey(type);
  // @ts-ignore line
  const [size, setSize] = useState<number>(layer?.layout?.[property] ?? 1);
  const [color, setColor] = useState<string>(
    // @ts-ignore line
    layer?.paint?.[property] ?? '#C11010'
  );
  const [method, setMethod] = useState<OptionsType>(options[0]);
  const [methodType, setMethodType] = useState<'match' | 'step'>('match');
  const [selectedCol, setSelectedCol] = useState<string>('');

  useEffect(() => {
    // @ts-ignore line
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const expression = layer?.[styleKey]?.[property];

    if (expression?.[0] === 'match' || expression?.[0] === 'step') {
      setMethod('conditional');
      setMethodType(expression?.[0]);
      setSelectedCol(expression?.[1]?.[1]);
    } else if (expression?.[0] === 'interpolate') setMethod('zoom');
    else if (expression?.[0] === 'get') setMethod('dynamic');
    else setMethod('static');

    if (['color', 'stroke-color'].includes(type))
      setColor(expression ?? '#C11010');
    if (['size', 'stroke-size'].includes(type)) setSize(expression ?? 1);
  }, [layer, styleKey, property]);

  const component = useMemo(() => {
    return {
      static: ['color', 'stroke-color'].includes(type) ? (
        // <Sample color={color} />
        <ColorPicker
          value={color}
          onChange={(newColor) => {
            if (property && styleKey && openLayerID && map)
              updateStyle(
                openLayerID,
                map,
                styleKey,
                property,
                newColor,
                setStyleObj
              );
          }}
        />
      ) : (
        <InputNumber
          min={1}
          max={20}
          value={size}
          onChange={(number: number) => {
            if (property && styleKey && openLayerID && map)
              updateStyle(
                openLayerID,
                map,
                styleKey,
                property,
                number,
                setStyleObj
              );
          }}
        />
      ),
      dynamic: (
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
                  ['get', value],
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
          </Select>
        </Selector>
      ),
      zoom: property && <ZoomBase type={type} />,
      conditional: property && (
        <Conditional
          type={type}
          method={methodType}
          selectedCol={selectedCol}
        />
      ),
    }[method];
  }, [
    method,
    methodType,
    selectedCol,
    size,
    columns,
    property,
    styleKey,
    color,
  ]);

  return (
    <Column>
      <Row>
        <Selector>
          <Label>
            <FormattedMessage
              id={
                ['color', 'stroke-color'].includes(type)
                  ? 'color_base_on'
                  : 'size_base_on'
              }
            />
          </Label>
          <Select
            defaultValue={options[0]}
            value={method}
            dir={intl.locale === 'fa' ? 'rtl' : 'ltr'}
            onValueChange={(value: OptionsType) => {
              setMethod(value);
            }}
          >
            <SelectTrigger
              aria-label={intl.formatMessage({
                id: ['color', 'stroke-color'].includes(type)
                  ? 'color_base_on'
                  : 'size_base_on',
              })}
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
                {options
                  ?.filter((o) => {
                    if (!columns)
                      return !['dynamic', 'conditional'].includes(o);
                    else if (columns && !distinctFunc)
                      return !['conditional'].includes(o);
                    else return true;
                  })
                  ?.map((option) => (
                    <SelectItem key={option} value={option}>
                      <SelectItemText>
                        <FormattedMessage id={option} />
                      </SelectItemText>
                      <SelectItemIndicator>
                        <Check />
                      </SelectItemIndicator>
                    </SelectItem>
                  ))}
              </SelectViewport>
            </SelectContent>
          </Select>
        </Selector>
        {method === 'static' && component}
      </Row>
      {method !== 'static' && <Row>{component}</Row>}
    </Column>
  );
};

export default memo(BaseOn);
