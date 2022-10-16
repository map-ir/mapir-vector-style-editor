import React from 'react';
import styled from 'styled-components/macro';
import * as SelectPrimitive from '@radix-ui/react-select';

const StyledTrigger = styled(SelectPrimitive.SelectTrigger)`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4;
  padding: 0 15px;
  font-size: 13;
  line-height: 1;
  height: 35;
  gap: 5;
  background-color: var(--light-1);
  color: var(--color-primary);
  box-shadow: 0 2px 10px var(--shade-5);
  &:hover {
    background-color: var(--shade-3);
  }
  &:focus {
    box-shadow: 0 0 0 2px var(--shade-1);
  }
  &[data-placeholder] {
    color: var(--shade-4);
  }
`;

const StyledIcon = styled(SelectPrimitive.SelectIcon)`
  color: var(--color-primary);
`;

const StyledContent = styled(SelectPrimitive.Content)`
  overflow: hidden;
  background-color: var(--light-1);
  border-radius: var(--radius-8);
  box-shadow: '0px 10px 38px -10px rgba(22; 23; 24; 0.35); 0px 10px 20px -15px rgba(22; 23; 24; 0.2)';
`;

const StyledViewport = styled(SelectPrimitive.Viewport)`
  padding: 5;
`;
// @ts-ignore line
function Content({ children, ...props }) {
  return (
    <SelectPrimitive.Portal>
      <StyledContent {...props}>{children}</StyledContent>
    </SelectPrimitive.Portal>
  );
}

const StyledItem = styled(SelectPrimitive.Item)`
  all: unset;
  font-size: 13;
  line-height: 1;
  color: var(--color-primary);
  border-radius: 3;
  display: flex;
  align-items: center;
  height: 25;
  padding: 0 35px 0 25px;
  position: relative;
  user-select: none;
  &[data-disabled] {
    color: var(--shade-3);
    pointer-events: none;
  }

  &[data-highlighted] {
    background-color: var(--color-primary);
    color: var(--color-primary);
  }
`;

const StyledLabel = styled(SelectPrimitive.Label)`
  padding: 0 25px;
  font-size: 12;
  line-height: 25px;
  color: var(--shade-3);
`;

const StyledSeparator = styled(SelectPrimitive.Separator)`
  height: 1;
  background-color: var(--shade-3);
  margin: 5;
`;

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator)`
  position: absolute;
  left: 0;
  width: 25;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const scrollButtonStyles = `
  display: flex;
  align-items: center;
  justify-content: cente;
  height: 25;
  background-color: white;
  color: var(--color-primary);
  cursor: default;
`;

const StyledScrollUpButton = styled(SelectPrimitive.ScrollUpButton);
scrollButtonStyles;

const StyledScrollDownButton = styled(SelectPrimitive.ScrollDownButton);
scrollButtonStyles;

// Exports
export const Select = SelectPrimitive.Root;
export const SelectTrigger = StyledTrigger;
export const SelectValue = SelectPrimitive.Value;
export const SelectIcon = StyledIcon;
export const SelectContent = Content;
export const SelectViewport = StyledViewport;
export const SelectGroup = SelectPrimitive.Group;
export const SelectItem = StyledItem;
export const SelectItemText = SelectPrimitive.ItemText;
export const SelectItemIndicator = StyledItemIndicator;
export const SelectLabel = StyledLabel;
export const SelectSeparator = StyledSeparator;
export const SelectScrollUpButton = StyledScrollUpButton;
export const SelectScrollDownButton = StyledScrollDownButton;
