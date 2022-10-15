import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components/macro';
import { useAtomValue, useSetAtom } from 'jotai';

import InputNumber from 'common/input-number';
import { Select } from 'common/styles';
import useGetSelectedLayer from 'hooks/useGetSelectedLayer';
import { mapState, selectedLayerIDState, styleObjState } from 'atoms/map';
import updateStyle from 'common/utils/update-style';

const SetSize = () => {
  const map = useAtomValue(mapState);
  const openLayerID = useAtomValue(selectedLayerIDState);
  const setStyleObj = useSetAtom(styleObjState);

  const { layer } = useGetSelectedLayer();

  const [property, setProperty] = useState<string | undefined>(undefined);

  useEffect(() => {
    switch (layer?.type) {
      case 'symbol':
        setProperty('icon-size');
        break;
    }
  }, [layer]);

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
        max={20}
        value="12"
        onChange={(number) =>
          property &&
          openLayerID &&
          map &&
          updateStyle(openLayerID, map, 'layout', property, number, setStyleObj)
        }
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
