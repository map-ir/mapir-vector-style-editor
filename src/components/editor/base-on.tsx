/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { memo, useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useAtomValue, useSetAtom } from 'jotai';

import useGetSelectedLayer from 'hooks/useGetSelectedLayer';
import useGetStyleKey from 'hooks/useGetStyleKey';
import updateStyle from 'common/utils/update-style';
import ZoomBase from './zoom-base';
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

import { mapState, selectedLayerIDState, styleObjState } from 'atoms/map';
import { columnsState } from 'atoms/general';

import { Row, Column, Selector, Label } from 'common/styles';

import { ReactComponent as Arrow } from '../../assets/icons/arrow-down.svg';
import { ReactComponent as Check } from '../../assets/icons/tick.svg';

const options = ['static', 'dynamic', 'zoom', 'conditional'] as const;
type OptionsType = typeof options[number];

interface IProps {
  type: 'size' | 'color' | 'stroke';
}

const BaseOn = ({ type }: IProps) => {
  const intl = useIntl();
  const map = useAtomValue(mapState);
  const openLayerID = useAtomValue(selectedLayerIDState);
  const setStyleObj = useSetAtom(styleObjState);
  const columns = useAtomValue(columnsState);

  const { layer } = useGetSelectedLayer();
  const { styleKey, property } = useGetStyleKey(type);
  // @ts-ignore line
  const [size, setSize] = useState<number>(layer?.layout?.[property] ?? 1);
  const [color, setColor] = useState<string>(
    // @ts-ignore line
    layer?.paint?.[property] ?? '#C11010'
  );
  const [method, setMethod] = useState<OptionsType>(options[0]);

  useEffect(() => {
    setColor(
      // @ts-ignore line
      layer?.[styleKey]?.[property] ?? '#C11010'
    );
    // @ts-ignore line
    setSize(layer?.[styleKey]?.[property] ?? 1);
  }, [layer, styleKey, property]);

  const component = useMemo(() => {
    return {
      static:
        type === 'color' ? (
          // <Sample color={color} />
          <ColorPicker
            value={color}
            onChange={(e) => {
              if (property && styleKey && openLayerID && map)
                updateStyle(
                  openLayerID,
                  map,
                  styleKey,
                  property,
                  e.target.value,
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
      conditional: <></>,
    }[method];
  }, [method, size, columns, property, styleKey, color]);

  return (
    <Column>
      <Row>
        <Selector>
          <Label>
            <FormattedMessage
              id={type === 'color' ? 'color_base_on' : 'size_base_on'}
            />
          </Label>
          <Select
            defaultValue={options[0]}
            dir={intl.locale === 'fa' ? 'rtl' : 'ltr'}
            onValueChange={(value: OptionsType) => {
              setMethod(value);
            }}
          >
            <SelectTrigger
              aria-label={intl.formatMessage({
                id: type === 'color' ? 'color_base_on' : 'size_base_on',
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
