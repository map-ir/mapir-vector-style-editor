import React from 'react';
import type { SliderProps } from '@radix-ui/react-slider';
interface IProps extends SliderProps {
    pairs: (string | number)[][];
}
declare const _default: React.MemoExoticComponent<({ pairs, ...props }: IProps) => JSX.Element>;
export default _default;
