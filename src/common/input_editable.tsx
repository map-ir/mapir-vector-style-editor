import React, { forwardRef, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';

import type { ForwardedRef, KeyboardEvent } from 'react';

interface IProps {
  value: string;
  onChange?: (value: string, event: KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  as?: React.ElementType;
}

const EditableInput = forwardRef(function EditableInput(
  { className, as, value, onChange, ...props }: IProps,
  ref?: ForwardedRef<HTMLInputElement> | null
) {
  const [editable, setEditable] = useState(false);

  const onkeyup = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      onChange?.((e.target as HTMLInputElement).value, e);
    }
  }, []);

  return (
    <StyledInput
      ref={ref}
      className={className}
      editable={editable}
      defaultValue={value}
      onKeyUp={onkeyup}
      onFocus={setEditable.bind(null, true)}
      onBlur={setEditable.bind(null, false)}
      {...props}
    />
  );
});

export default EditableInput;

const StyledInput = styled.input<{ editable: boolean }>`
  min-width: 2em;
  height: 2em;
  border-radius: var(--SE-radius-4);
  font-family: inherit;
  padding-inline: 1ch;

  ${(p) =>
    !p.editable &&
    css`
      border: unset;
      outline: unset;

      :hover {
        background: var(--SE-light-2);
      }
    `};
`;
