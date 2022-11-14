/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components/macro';
import Color from 'color';

const ColorPicker = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const color = Color(props.value);

  return <ColorInput {...props} value={color.hex()} type={'color'} />;
};

export default ColorPicker;

const ColorInput = styled.input`
  appearance: none;
  margin: 0;
  padding: 0;
  background: unset;
  width: 2em;
  height: 2em;
  border: 0;
  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  &::-webkit-color-swatch {
    border: 0;
    border-radius: var(--radius-4);
  }
`;
