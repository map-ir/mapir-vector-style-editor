import React from 'react';
import styled, { css } from 'styled-components';
import styledMap from 'styled-map';

import { ReactComponent as ArrowDownIcon } from '../assets/icons/arrow-down.svg';

import type { Renderable } from '../types/general';

interface IExpandableProps {
  open: boolean;
  onOpen?: () => void;
  className?: string;
  isExpandable?: boolean;
  HeaderRenderer?: () => JSX.Element | null;
  children?: Renderable;
}

function Expandable({
  className,
  children,
  HeaderRenderer,
  open,
  onOpen,
  isExpandable = true,
}: IExpandableProps) {
  return (
    <ExpandableWrapper className={className}>
      <HeaderWrapper>
        <Header>{HeaderRenderer && <HeaderRenderer />}</Header>
        {isExpandable && (
          <HeaderAction>
            <UnitOpen onClick={onOpen} open={open}>
              <ArrowDownIcon color={'var(--SE-shade-3)'} />
            </UnitOpen>
          </HeaderAction>
        )}
      </HeaderWrapper>
      {isExpandable && <Body open={open}>{children}</Body>}
    </ExpandableWrapper>
  );
}

export default Expandable;

const ExpandableWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding: 0 1em;
  border-radius: var(--SE-radius-8);
  border: 1px solid var(--SE-shade-3);
  box-sizing: border-box;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
  padding: 1em 0;
  box-sizing: border-box;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-grow: 2;
`;

const HeaderAction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const UnitOpen = styled.span<{ open: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1em;
  height: 1em;
  cursor: pointer;
  user-select: none;
  transform: rotate(
    ${styledMap`
      open: 0;
      default: 180;
    `}deg
  );
`;

const Body = styled.div<{ open: boolean }>`
  width: 100%;
  background-color: var(--SE-light-1);
  height: 0;
  overflow: hidden;

  ${(props) =>
    props.open &&
    css`
      height: auto;
      border-top: 1px solid var(--SE-shade-5);
    `}
`;
