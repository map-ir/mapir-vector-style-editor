import React, { useCallback, forwardRef } from 'react';
import styled from 'styled-components/macro';
import { useIntl } from 'react-intl';

import { toNumberString, toEnDigits, toFaDigits, toNumber } from './utils';

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
  const valueAsNumber = toNumber(value);

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
    [valueAsNumber]
  );

  const numValue = (
    Math.round(((valueAsNumber ?? 10) + Number.EPSILON) * 100) / 100
  )
    .toFixed(1)
    .replace(/[.,]0$/, '');

  return (
    <StyledInput
      ref={ref}
      as={as}
      className={className}
      {...(props ?? {})}
      value={intl.locale === 'en' ? numValue : toFaDigits(numValue)}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        _onChange(parseFloat(toNumberString(toEnDigits(e.target.value))));
      }}
      onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => onKeyPress(e)}
    />
  );
}

export default forwardRef(NumberInput);

const StyledInput = styled.input`
  width: 2em;
  height: 2em;
  text-align: center;
  border: 1px solid var(--shade-3);
  border-radius: var(--radius-4);
  font-family: inherit;
`;
