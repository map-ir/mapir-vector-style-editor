import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled, { css } from 'styled-components';

export interface ITab {
  id: string;
  disabled?: boolean;
}

interface ITabs {
  className?: string;
  tabs: ITab[];
  activeTabId?: ITab['id'];
  onTabChange?: (id: ITab['id']) => void;
  align?: 'center' | 'start' | 'end';
  horizental?: boolean;
  secondry?: boolean;
}

const SectionTab = ({
  className,
  tabs,
  activeTabId,
  onTabChange,
  align = 'start',
  horizental = false,
  secondry = false,
}: ITabs) => {
  return (
    <Tabs className={className} align={align}>
      <TabNav horizental={horizental}>
        {tabs?.map(({ id, disabled }) => {
          return (
            <TabItem
              key={id}
              secondry={secondry}
              active={id === activeTabId}
              $disabled={disabled}
              onClick={onTabChange?.bind(null, id)}
            >
              <FormattedMessage id={id} />
            </TabItem>
          );
        })}
      </TabNav>
    </Tabs>
  );
};

export default SectionTab;

const Tabs = styled.nav<{ align: ITabs['align'] }>`
  display: flex;
  flex-direction: column;
  justify-content: ${(p) => p.align};
  align-items: flex-start;
`;

const TabNav = styled.ul<{ horizental?: boolean }>`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: ${(p) => (p.horizental ? 'column' : 'row')};
  justify-content: space-between;
  align-items: center;
  list-style: none;
`;

const TabItem = styled.li<{
  active?: boolean;
  $disabled?: boolean;
  secondry?: boolean;
}>`
  padding: 0.5em 2rem;
  color: var(--SE-shade-1);
  box-shadow: none;
  outline: none;
  border: none;
  border-radius: var(--SE-radius-8) var(--SE-radius-8) 0 0;
  cursor: pointer;
  display: block;
  position: relative;
  font-family: inherit;

  ${(p) =>
    p.secondry &&
    css`
      color: var(--SE-shade-2);
      border-radius: var(--SE-radius-8);
    `}

  ${(p) =>
    p.active &&
    (p.secondry
      ? css`
          background-color: var(--SE-shade-4);
          color: var(--SE-shade-1);
        `
      : css`
          background-color: var(--SE-light-2);
        `)}

  ${(p) =>
    p.$disabled &&
    css`
      pointer-events: none;
      filter: grayscale(1);
    `}
`;
