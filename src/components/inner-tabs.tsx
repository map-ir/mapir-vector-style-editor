import React, { useState, useCallback, useMemo, useEffect } from 'react';

import SectionTab from 'common/section-tab';
import { PageSwitch, Page } from 'common/page-switch';
import { LayerComponent, EditorWrapper } from 'common/styles';

import { symbolTabs, circleTabs, components } from './constants';

import type { LayerType } from 'types/map';
import type { ITab } from './constants';

interface IProps {
  type: LayerType;
}

const tabsComponent = {
  symbol: symbolTabs,
  circle: circleTabs,
  heatmap: symbolTabs,
  cluster: symbolTabs,
  line: symbolTabs,
  fill: symbolTabs,
};

const InnerTabs = ({ type }: IProps) => {
  const tabs = useMemo(() => {
    return tabsComponent[type];
  }, [type]);

  const currTab = tabs.map((t) => t.id);
  type PageIds = typeof currTab[number];

  const [activePageId, setActivePageId] = useState<PageIds>(
    // @ts-ignore line
    (tabs.filter((i: ITab<PageIds>) => !i.disabled) as ITab<PageIds>[])[0].id
  );

  const changeTab = useCallback(
    (id: string) => {
      // @ts-ignore line
      return !(tabs.find((i: ITab<PageIds>) => i.id === id) as ITab<PageIds>)
        ?.disabled
        ? setActivePageId(id as PageIds)
        : undefined;
    },
    [tabs]
  );

  useEffect(() => {
    setActivePageId(
      // @ts-ignore line
      (tabs.filter((i: ITab<PageIds>) => !i.disabled) as ITab<PageIds>[])[0].id
    );
  }, [type]);

  return (
    <LayerComponent>
      <SectionTab
        tabs={tabs}
        align="start"
        activeTabId={activePageId}
        onTabChange={changeTab}
        horizental={false}
      />

      <PageSwitch pageId={activePageId}>
        {tabs.map((tab) => (
          <Page key={tab?.id} id={tab?.id}>
            <EditorWrapper>{components?.[tab?.id]}</EditorWrapper>
          </Page>
        ))}
      </PageSwitch>
    </LayerComponent>
  );
};

export default InnerTabs;
