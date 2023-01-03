/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { InputHTMLAttributes, useCallback } from 'react';
import styled from 'styled-components';
import Color from 'color';

import { debounce } from './utils';

const ColorPicker = ({
  value,
  onChange: _onChange,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  const color = Color(value);

  const onChange = useCallback(
    _onChange ? debounce(_onChange, 300) : () => undefined,
    [_onChange]
  );

  return (
    <ColorInput
      type={'color'}
      {...props}
      value={color.hex()}
      onChange={onChange}
    />
  );
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
    border-radius: var(--SE-radius-4);
  }
`;
