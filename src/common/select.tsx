/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import styled from 'styled-components';
import * as SelectPrimitive from '@radix-ui/react-select';

const StyledTrigger = styled(SelectPrimitive.SelectTrigger)`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-4);
  padding: 0 0.5em;
  line-height: 1;
  height: 2em;
  gap: 1em;
  background-color: var(--light-1);
  color: var(--shade-1);
  border: 1px solid var(--shade-3);
  &:hover {
    background-color: var(--light-2);
  }
  &:focus {
  }
  &[data-placeholder] {
    color: var(--shade-4);
  }
`;

const StyledIcon = styled(SelectPrimitive.SelectIcon)`
  color: var(--shade-2);
  transform: rotate(180deg);
`;

const StyledContent = styled(SelectPrimitive.Content)`
  overflow: hidden;
  background-color: var(--light-1);
  border-radius: var(--radius-8);
  border: 1px solid var(--shade-3);
  z-index: 10000;
`;

const StyledViewport = styled(SelectPrimitive.Viewport)`
  padding: 1rem;
`;
// @ts-ignore line
// eslint-disable-next-line react/prop-types
function Content({ children, ...props }) {
  return (
    <SelectPrimitive.Portal>
      <StyledContent {...props}>{children}</StyledContent>
    </SelectPrimitive.Portal>
  );
}

const StyledItem = styled(SelectPrimitive.Item)`
  all: unset;
  line-height: 1;
  color: var(--shade-3);
  border-radius: var(--radius-4);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.5em;
  height: 1em;
  padding: 0.5em;
  position: relative;
  user-select: none;
  &[data-disabled] {
    color: var(--shade-3);
    pointer-events: none;
  }

  &[data-highlighted] {
    background-color: var(--color-primary-20);
    color: var(--shade-2);
  }
`;

const StyledLabel = styled(SelectPrimitive.Label)`
  padding: 0 0.5em;
  line-height: 1;
  color: var(--shade-3);
`;

const StyledSeparator = styled(SelectPrimitive.Separator)`
  height: 1em;
  background-color: var(--shade-3);
  margin: 1em;
`;

const StyledItemText = styled(SelectPrimitive.ItemText)``;

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator)`
  width: 1em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

// const scrollButtonStyles = `
//   display: flex;
//   align-items: center;
//   justify-content: cente;
//   height: 25;
//   background-color: white;
//   color: var(--color-primary);
//   cursor: default;
// `;

const StyledScrollUpButton = styled(SelectPrimitive.ScrollUpButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1em;
  background-color: var(--light-1);
  color: var(--color-primary);
  cursor: default;
`;

const StyledScrollDownButton = styled(SelectPrimitive.ScrollDownButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1em;
  background-color: var(--light-1);
  color: var(--color-primary);
  cursor: default;
`;

// Exports
export const Select = SelectPrimitive.Root;
export const SelectTrigger = StyledTrigger;
export const SelectValue = SelectPrimitive.Value;
export const SelectIcon = StyledIcon;
export const SelectContent = Content;
export const SelectViewport = StyledViewport;
export const SelectGroup = SelectPrimitive.Group;
export const SelectItem = StyledItem;
export const SelectItemText = StyledItemText;
export const SelectItemIndicator = StyledItemIndicator;
export const SelectLabel = StyledLabel;
export const SelectSeparator = StyledSeparator;
export const SelectScrollUpButton = StyledScrollUpButton;
export const SelectScrollDownButton = StyledScrollDownButton;
