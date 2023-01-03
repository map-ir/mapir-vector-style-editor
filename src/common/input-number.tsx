import React, { useCallback, forwardRef } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import { toEnDigits, toFaDigits } from './utils';

import type { ForwardedRef } from 'react';

interface IProps {
  className?: string;
  value: string | number;
  step?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  as?: React.ElementType;
}

function NumberInput(
  { className, value, min, max, step = 1, onChange, as, ...props }: IProps,
  ref?: ForwardedRef<HTMLInputElement> | null
) {
  const intl = useIntl();
  // const valueAsNumber = toNumber(value);
  const valueAsNumber = parseFloat(value.toString());

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _onChange = useCallback(
    (v: number) => {
      const Min = min ?? -Infinity;
      const Max = max ?? Infinity;
      const Value = v ? v : 0;
      const correctValue = Value < Min ? Min : Value > Max ? Max : Value;
      onChange?.(correctValue);
    },
    [min, max, onChange]
  );

  const onKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      switch (e.code) {
        case 'ArrowUp':
          _onChange(valueAsNumber + step);
          target.selectionEnd = target.value.length;
          break;
        case 'ArrowDown':
          _onChange(valueAsNumber - step);
          target.selectionEnd = target.value.length;
          break;
        default:
          break;
      }
    },
    [valueAsNumber, _onChange]
  );

  const numValue =
    valueAsNumber % 1 === 0 ? valueAsNumber : valueAsNumber.toFixed(2);

  return (
    <StyledInput
      ref={ref}
      as={as}
      className={className}
      {...(props ?? {})}
      value={intl.locale === 'en' ? numValue : toFaDigits(numValue)}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        _onChange(parseFloat(toEnDigits(e.target.value.toString())));
      }}
      onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => onKeyPress(e)}
    />
  );
}

export default forwardRef(NumberInput);

const StyledInput = styled.input`
  min-width: 2em;
  max-width: 2em;
  height: 2em;
  text-align: center;
  border: 1px solid var(--SE-shade-3);
  border-radius: var(--SE-radius-4);
  font-family: inherit;
`;
