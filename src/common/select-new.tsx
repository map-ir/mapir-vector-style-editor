import React from 'react';
import styled from 'styled-components';
import { Combobox } from '@headlessui/react';

export const StyledCombo = styled(Combobox)`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--SE-radius-4);
  padding: 0 0.5em;
  line-height: 1;
  height: 2em;
  gap: 1em;
  background-color: var(--SE-light-1);
  color: var(--SE-shade-1);
  border: 1px solid var(--SE-shade-3);
  &:hover {
    background-color: var(--SE-light-2);
  }
  &:focus {
  }
  &[data-placeholder] {
    color: var(--SE-shade-3);
  }
`;
