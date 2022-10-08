import React, { useState, useCallback, useMemo } from 'react';

import SectionTab from '../common/section-tab';
import { PageSwitch, Page } from '../common/page-switch';
import { LayerComponent, EditorWrapper } from '../common/styles';
import { symbolTabs, circleTabs, components } from './constans';

import type { SymbolPageIdsType as PageIds } from './constans';
import type { LayerType } from '../types/map';

interface IProps {
  type: LayerType;
}

const InnerTabs = ({ type }: IProps) => {
  const tabs = useMemo(() => {
    return {
      symbol: symbolTabs,
      circle: circleTabs,
      heatmap: symbolTabs,
      cluster: symbolTabs,
      line: symbolTabs,
      fill: symbolTabs,
    }[type];
  }, [type]);

  const [activePageId, setActivePageId] = useState<PageIds>(
    () => tabs.filter((i) => !i.disabled).slice(0)[0].id as PageIds
  );

  const changeTab = useCallback(
    (id: string) => {
      return !tabs.find((i) => i.id === id)?.disabled
        ? setActivePageId(id as PageIds)
        : undefined;
    },
    [tabs]
  );

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
