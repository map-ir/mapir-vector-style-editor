import React, { useEffect } from 'react';
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

  useEffect(() => {}, [layer]);

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
          openLayerID &&
          map &&
          updateStyle(
            openLayerID,
            map,
            'layout',
            'icon-size',
            number,
            setStyleObj
          )
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
