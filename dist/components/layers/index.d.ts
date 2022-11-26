/// <reference types="react" />
import type { Style } from 'mapbox-gl';
interface IProps {
    onSubmit?: (arg: Style | null) => void;
}
export default function Editor({ onSubmit }: IProps): JSX.Element;
export {};
