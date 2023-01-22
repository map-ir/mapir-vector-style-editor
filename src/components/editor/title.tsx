/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useAtom, useAtomValue } from 'jotai';

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
import deleteLayer from 'common/utils/delete-layer';
import { addNewLayer } from 'common/utils/add-new-layer';

import {
  layerState,
  mapState,
  selectedLayerIDState,
  styleObjState,
} from 'atoms/map';
import { columnsState } from 'atoms/general';

import { ReactComponent as Arrow } from '../../assets/icons/arrow-down.svg';
import { ReactComponent as Check } from '../../assets/icons/tick.svg';

import type { Layer } from 'mapbox-gl';

const SetTitle = () => {
  const intl = useIntl();
  const map = useAtomValue(mapState);
  const openLayerID = useAtomValue(selectedLayerIDState);
  const [styleObj, setStyleObj] = useAtom(styleObjState);
  const columns = useAtomValue(columnsState);
  const BaseLayer = useAtomValue(layerState);

  const [layer, setLayer] = useState<Layer>();
  const [layerID, setLayerID] = useState(openLayerID);
  const [fontColor, setColor] = useState('#000000');
  const [fontSize, setSize] = useState(16);
  const [field, setField] = useState('no-value');

  useEffect(() => {
    if (openLayerID && BaseLayer?.type !== 'symbol') {
      setLayerID(`${openLayerID}-text-layer`);
    } else setLayerID(openLayerID);
  }, [openLayerID, BaseLayer]);

  useEffect(() => {
    if (map && layerID) {
      // add a symbol layer for text
      if (!map?.getLayer(layerID)) addNewLayer('text', setStyleObj, layerID);
      setLayer(styleObj?.layers?.find((l: Layer) => l.id === layerID));
    }
  }, [map, layerID, styleObj]);

  useEffect(() => {
    // @ts-ignore line
    setColor(layer?.paint?.['text-color'] ?? '#000000');
    // @ts-ignore line
    setSize(layer?.layout?.['text-size'] ?? 16);
    setField(
      // @ts-ignore line
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      layer?.layout?.['text-field']
        ? // @ts-ignore line
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          layer?.layout?.['text-field']?.[1]
        : 'no-value'
    );
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
            onChange={(color) => {
              {
                if (layerID && map)
                  updateStyle(
                    layerID,
                    map,
                    'paint',
                    'text-color',
                    color,
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
              if (layerID && map) {
                if (value === 'no-value') {
                  if (BaseLayer?.type !== 'symbol') {
                    deleteLayer(layerID, map, setStyleObj);
                  } else {
                    updateStyle(
                      layerID,
                      map,
                      'layout',
                      'text-field',
                      '',
                      setStyleObj
                    );
                  }
                } else
                  updateStyle(
                    layerID,
                    map,
                    'layout',
                    'text-field',
                    ['get', value],
                    setStyleObj
                  );
              }
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
                <SelectItem value={'no-value'}>
                  <SelectItemText>
                    <FormattedMessage id="no-value" />
                  </SelectItemText>
                  <SelectItemIndicator>
                    <Check />
                  </SelectItemIndicator>
                </SelectItem>
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
