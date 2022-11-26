import React from 'react';
interface IProps {
    className?: string;
    value: string | number;
    step?: number;
    min?: number;
    max?: number;
    onChange?: (value: number) => void;
    as?: React.ElementType;
}
declare const _default: React.ForwardRefExoticComponent<IProps & React.RefAttributes<HTMLInputElement>>;
export default _default;
