import React, { forwardRef } from 'react';
import type {
  Dispatch,
  SetStateAction,
  MouseEventHandler,
  ForwardedRef,
} from 'react';
import styled, { css } from 'styled-components/macro';

interface IProps {
  onClick?:
    | (MouseEventHandler<HTMLDivElement> & Dispatch<SetStateAction<boolean>>)
    | undefined;
  color?: string;
  border?: string;
  img?: string;
  x?: string;
  y?: string;
}

const Sample = (props: IProps, ref: ForwardedRef<HTMLDivElement> | null) => {
  return <Container ref={ref} {...props} />;
};

export default forwardRef(Sample);

export const Container = styled.div<IProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 2em;
  height: 2em;
  border-radius: 5px;
  border: 1px solid var(--light-3);
  background: var(--light-1);

  ${(p) =>
    p.img &&
    css`
      background: url(${p.img}) ${p.x} ${p.y};
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
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
