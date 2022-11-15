import React, { memo } from 'react';
import PointEditor from '../point';
import InnerTabs from 'components/inner-tabs';

import type { LayerType } from '../../types/map';
interface IProps {
  type: LayerType;
}

const SpecEditor = ({ type }: IProps) => {
  switch (type) {
    case 'symbol':
      return <PointEditor type={type} />;
    case 'circle':
      return <PointEditor type={type} />;
    default:
      return <InnerTabs type={type} />;
  }
};

export default memo(SpecEditor);
