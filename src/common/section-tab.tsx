import React from 'react';
import styled, { css } from 'styled-components/macro';

export interface ITab {
  id: string;
  name: string;
  disabled?: boolean;
}

interface ITabs {
  className?: string;
  tabs: ITab[];
  activeTabId?: ITab['id'];
  onTabChange?: (id: ITab['id']) => void;
  align?: 'center' | 'start' | 'end';
  horizental?: boolean;
}

const SectionTab = ({
  className,
  tabs,
  activeTabId,
  onTabChange,
  align = 'start',
  horizental = false,
}: ITabs) => {
  return (
    <Tabs className={className} align={align}>
      <TabNav horizental={horizental}>
        {tabs.map(({ id, name, disabled }) => {
          return (
            <TabItem
              key={id}
              active={id === activeTabId}
              $disabled={disabled}
              onClick={onTabChange?.bind(null, id)}
            >
              {name}
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
  align-items: center;
  gap: 2em;
`;

const TabNav = styled.ul<{ horizental?: boolean }>`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: ${(p) => (p.horizental ? 'column' : 'row')};
  align-items: center;
  list-style: none;
  gap: 1em;
  padding: 0.5em;
  border-radius: 10px;
  box-shadow: ${(p) =>
    p.horizental ? 'unset' : '0 3px 6px 0 rgba(0, 0, 0, 0.16)'};
  background-color: #fff;
`;

const TabItem = styled.li<{ active?: boolean; $disabled?: boolean }>`
  padding: 0.5em 1rem;
  color: var(--color-primary);
  box-shadow: none;
  outline: none;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.2em;
  display: block;
  position: relative;
  font-family: inherit;

  ${(p) =>
    p.active &&
    css`
      background-color: #f0f5ff;
    `}

  ${(p) =>
    p.$disabled &&
    css`
      pointer-events: none;
      filter: grayscale(1);
    `}
`;
