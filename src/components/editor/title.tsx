/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useAtomValue, useSetAtom } from 'jotai';

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
import { Column, Row, Selector, Label } from 'common/styles';
import updateStyle from 'common/utils/update-style';

import {
  layerState,
  mapState,
  selectedLayerIDState,
  styleObjState,
} from 'atoms/map';
import { columnsState } from 'atoms/general';

import { ReactComponent as Arrow } from '../../assets/icons/arrow-down.svg';
import { ReactComponent as Check } from '../../assets/icons/tick.svg';
import { addNewLayer } from 'common/utils/add-new-layer';

import type { Layer } from 'mapbox-gl';

const SetTitle = () => {
  const intl = useIntl();
  const map = useAtomValue(mapState);
  const openLayerID = useAtomValue(selectedLayerIDState);
  const setStyleObj = useSetAtom(styleObjState);
  const columns = useAtomValue(columnsState);
  const BaseLayer = useAtomValue(layerState);

  const [layer, setLayer] = useState<Layer>();
  const [layerID, setLayerID] = useState(openLayerID);
  const [fontColor, setColor] = useState('#000000');
  const [fontSize, setSize] = useState(16);
  const [field, setField] = useState('');

  useEffect(() => {
    if (openLayerID && BaseLayer?.type !== 'symbol') {
      setLayerID(`${openLayerID}-text-layer`);
    } else setLayerID(openLayerID);
  }, [openLayerID, BaseLayer]);

  useEffect(() => {
    if (map && layerID) {
      // add a symbol layer for text
      if (!map?.getLayer(layerID)) addNewLayer('text', setStyleObj, layerID);
      setLayer(map?.getStyle()?.layers?.find((l: Layer) => l.id === layerID));
    }
  }, [map, layerID]);

  useEffect(() => {
    // @ts-ignore line
    setColor(layer?.paint?.['text-color'] ?? '#000000');
    // @ts-ignore line
    setSize(layer?.layout?.['text-size'] ?? 16);
    // @ts-ignore line
    setField(layer?.layout?.['text-field'] ?? '');
  }, [layer]);

  return (
    <Column>
      <Row>
        <Selector style={{ width: '50%' }}>
          <Label>
            <FormattedMessage id="font-size" />
          </Label>
          <InputNumber
            min={0}
            max={50}
            value={fontSize}
            onChange={(number) => {
              {
                if (layerID && map)
                  updateStyle(
                    layerID,
                    map,
                    'layout',
                    'text-size',
                    number,
                    setStyleObj
                  );
              }
            }}
          />
        </Selector>
        <Selector style={{ width: '50%' }}>
          <Label>
            <FormattedMessage id="font-color" />
          </Label>
          <ColorPicker
            value={fontColor}
            onChange={(e) => {
              {
                if (layerID && map)
                  updateStyle(
                    layerID,
                    map,
                    'paint',
                    'text-color',
                    e.target.value,
                    setStyleObj
                  );
              }
            }}
          />
        </Selector>
      </Row>
      <Row>
        <Selector>
          <Label>
            <FormattedMessage id="value_title" />
          </Label>
          <Select
            dir={intl.locale === 'fa' ? 'rtl' : 'ltr'}
            value={field}
            onValueChange={(value) => {
              if (layerID && map)
                updateStyle(
                  layerID,
                  map,
                  'layout',
                  'text-field',
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
      </Row>
    </Column>
  );
};

export default SetTitle;
