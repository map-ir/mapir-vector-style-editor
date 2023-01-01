import type { Style } from 'mapbox-gl';
import type { MapProps } from 'types/map';

interface IProps {
  map: MapProps;
  locale?: 'fa' | 'en';
  styleURL: string;
  sprite?: string;
  title?: string;
  columns?: string[];
  className?: string;
  onSubmit?: (arg: Style | null) => void;
  onCancle?: (arg: Style | null) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDistinctValues?: (arg: string) => Promise<any>;
}

type Renderable = JSX.Element | undefined | null | false;

export type { IProps, Renderable };
