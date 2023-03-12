import type { StyleSpecification } from 'maplibre-gl';
import type { MapOptions } from '../types/map';

interface IProps {
  map?: MapOptions;
  locale?: 'fa' | 'en';
  styleURL: string;
  sprite?: string;
  title?: string;
  columns?: string[];
  className?: string;
  onSubmit?: (arg: StyleSpecification | null) => void;
  onCancel?: (arg: StyleSpecification | null) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDistinctValues?: (arg: string) => Promise<any>;
}

type Renderable = JSX.Element | undefined | null | false;

export type { IProps, Renderable };
