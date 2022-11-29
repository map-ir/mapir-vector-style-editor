import React from 'react';
import type { Dispatch, SetStateAction, MouseEventHandler } from 'react';
interface IProps {
    onClick?: (MouseEventHandler<HTMLDivElement> & Dispatch<SetStateAction<boolean>>) | undefined;
    title?: string;
    color?: string;
    border?: string;
    img?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}
declare const _default: React.ForwardRefExoticComponent<IProps & React.RefAttributes<HTMLDivElement>>;
export default _default;
export declare const Container: import("styled-components").StyledComponent<"div", any, IProps, never>;
