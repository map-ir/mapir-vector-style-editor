import React, { CSSProperties } from 'react';
interface IButtonProps {
    id?: string;
    className?: string;
    children?: JSX.Element | string;
    style?: CSSProperties;
    primary?: boolean;
    secondary?: boolean;
    tertiary?: boolean;
    error?: boolean;
    success?: boolean;
    cancel?: boolean;
    deactive?: boolean;
    default?: boolean;
    large?: boolean;
    medium?: boolean;
    loading?: boolean;
    icon?: JSX.Element;
    iconPath?: string;
    to?: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: React.SyntheticEvent) => void;
    disable?: boolean;
    off?: boolean;
}
declare function Button({ id, className, children, style, loading, disable, off, iconPath, icon, to, type, onClick, ...styleProps }: IButtonProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Button>;
export default _default;
