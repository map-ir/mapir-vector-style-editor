/* eslint-disable @typescript-eslint/indent */
import React, { forwardRef } from 'react';
import type {
  Dispatch,
  SetStateAction,
  MouseEventHandler,
  ForwardedRef,
} from 'react';
import styled, { css } from 'styled-components';

interface IProps {
  onClick?:
    | (MouseEventHandler<HTMLDivElement> & Dispatch<SetStateAction<boolean>>)
    | undefined;
  title?: string;
  color?: string;
  border?: string;
  img?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

const Sample = (props: IProps, ref: ForwardedRef<HTMLDivElement> | null) => {
  return <Container ref={ref} {...props} />;
};

export default forwardRef(Sample);

export const Container = styled.div<IProps>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 2em;
  height: 2em;
  border-radius: 5px;
  border: 1px solid var(--light-3);

  ${(p) =>
    p.img &&
    css`
      background-image: url(${p.img});
      background-position: -${p.x}px -${p.y}px;
      background-repeat: no-repeat;
      background-size: unset;
      width: ${p.width}px;
      height: ${p.height}px;
    `};

  ${(p) =>
    p.color &&
    css`
      background: ${p.color};
    `}

  ${(p) =>
    p.border &&
    css`
      border: 2px solid ${p.border};
    `}
`;
