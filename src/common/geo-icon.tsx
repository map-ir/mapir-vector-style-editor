import React from 'react';
import { ReactComponent as NoGeoIcon } from '../assets/icons/geom.svg';
import { ReactComponent as PointIcon } from '../assets/icons/point.svg';
import { ReactComponent as LineIcon } from '../assets/icons/line.svg';
import { ReactComponent as PolygonIcon } from '../assets/icons/polygon.svg';

interface IProps {
  data: string;
  color?: string;
}
const GeoIcon = ({ data, color }: IProps) => {
  switch (data) {
    case 'point':
      return <PointIcon color={color} />;
    case 'symbol':
      return <PointIcon color={color} />;
    case 'circle':
      return <PointIcon color={color} />;
    case 'multipoint':
      return <PointIcon color={color} />;
    case 'linestring':
      return <LineIcon color={color} />;
    case 'line':
      return <LineIcon color={color} />;
    case 'multilinestring':
      return <LineIcon color={color} />;
    case 'polygon':
      return <PolygonIcon color={color} />;
    case 'fill':
      return <PolygonIcon color={color} />;
    case 'multipolygon':
      return <PolygonIcon color={color} />;
    default:
      return <NoGeoIcon color={color} />;
  }
};

export default GeoIcon;
