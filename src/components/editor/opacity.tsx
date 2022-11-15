import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useAtomValue, useSetAtom } from 'jotai';

import InputNumber from 'common/input-number';
import RangeSlider from 'common/range-slider';
import { Row, Selector, Label } from 'common/styles';
import updateStyle from 'common/utils/update-style';
import useGetStyleKey from 'hooks/useGetStyleKey';

import {
  layerState,
  mapState,
  selectedLayerIDState,
  styleObjState,
} from 'atoms/map';

const SetOpacity = () => {
  const intl = useIntl();
  const map = useAtomValue(mapState);
  const openLayerID = useAtomValue(selectedLayerIDState);
  const setStyleObj = useSetAtom(styleObjState);
  const layer = useAtomValue(layerState);

  const { styleKey, property } = useGetStyleKey('opacity');

  const [opacity, setOpacity] = useState(100);

  useEffect(() => {
    // @ts-ignore line
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    setOpacity((layer?.[styleKey]?.[property] ?? 1) * 100);
  }, [layer, styleKey, property]);

  return (
    <Row>
      <Selector style={{ width: '65%' }}>
        <Label>
          <FormattedMessage id="opacity" />
        </Label>
        <RangeSlider
          value={[opacity]}
          min={0}
          max={100}
          step={1}
          dir={intl.locale === 'fa' ? 'rtl' : 'ltr'}
          aria-label="opacity"
          onValueChange={(value) => {
            {
              if (property && styleKey && openLayerID && map)
                updateStyle(
                  openLayerID,
                  map,
                  styleKey,
                  property,
                  value[0] / 100,
                  setStyleObj
                );
            }
          }}
        />
      </Selector>
      <InputNumber
        min={0}
        max={100}
        value={opacity}
        onChange={(number) => {
          {
            if (property && styleKey && openLayerID && map)
              updateStyle(
                openLayerID,
                map,
                styleKey,
                property,
                number / 100,
                setStyleObj
              );
          }
        }}
      />
    </Row>
  );
};

export default SetOpacity;
