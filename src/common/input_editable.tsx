import React, { forwardRef, useState } from 'react';
import styled, { css } from 'styled-components';

import type { ForwardedRef, ChangeEvent } from 'react';

interface IProps {
  value: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  as?: React.ElementType;
}

const EditableInput = forwardRef(function EditableInput(
  { className, as, onChange, ...props }: IProps,
  ref?: ForwardedRef<HTMLInputElement> | null
) {
  const [editable, setEditable] = useState(false);

  return (
    <StyledInput
      ref={ref}
      className={className}
      editable={editable}
      onChange={(e) => onChange?.(e.target.value, e)}
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
  /* border: 1px solid var(--SE-shade-3);
  border-radius: var(--SE-radius-4); */
  font-family: inherit;

  ${(p) =>
    !p.editable &&
    css`
      border: unset;
      outline: unset;
    `};
`;
