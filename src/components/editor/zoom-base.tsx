import React, { useState, useCallback, useMemo, useEffect, memo } from 'react';
import styled from 'styled-components/macro';

import SectionTab from 'common/section-tab';
import { PageSwitch, Page } from 'common/page-switch';
import { Column, Row } from 'common/styles';

import { ReactComponent as Plus } from '../../assets/icons/plus.svg';

interface IProps {
  type: 'color' | 'value';
}

const pageIds = ['linear', 'exponential', 'cubic'] as const;
type PageIds = typeof pageIds[number];

const tabs = [
  {
    id: 'linear',
  },
  {
    id: 'exponential',
    disabled: false,
  },
  {
    id: 'cubic',
    disabled: false,
  },
];

const ZoomBase = ({ type }: IProps) => {
  const [activePageId, setActivePageId] = useState<PageIds>(
    () => tabs.filter((i) => !i.disabled).slice(0)[0].id as PageIds
  );
  const changeTab = useCallback(
    (id: string) => {
      //* update current data. maybe use another method?
      return !tabs.find((i) => i.id === id)?.disabled
        ? setActivePageId(id as PageIds)
        : undefined;
    },
    [tabs]
  );
  return (
    <Column style={{ width: '100%' }}>
      <TabWrapper>
        <SectionTab
          tabs={tabs}
          align="center"
          activeTabId={activePageId}
          onTabChange={changeTab}
          secondry
        />
      </TabWrapper>
      <PageSwitch pageId={activePageId}>
        <Page id="linear">
          <Column>
            <Row>
              {type === 'value' ? (
                <div>*مقدار : زوم</div>
              ) : (
                <div>Color Range</div>
              )}
              <Plus color={'var(--color-primary)'} />
            </Row>
          </Column>
        </Page>
        <Page id="exponential">
          <div>exponentioal</div>
        </Page>
        <Page id="cubic">
          <div>cubic</div>
        </Page>
      </PageSwitch>
    </Column>
  );
};

export default memo(ZoomBase);

const TabWrapper = styled.div`
  align-self: center;
  background: var(--light-1);
  padding: 0.5em;
  border-radius: var(--radius-4);
`;
