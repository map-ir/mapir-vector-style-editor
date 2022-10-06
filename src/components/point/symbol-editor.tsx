import React, { useState, useCallback } from 'react';

import SectionTab from '../../common/section-tab';
import { PageSwitch, Page } from '../../common/page-switch';
import { LayerComponent, EditorWrapper } from '../../common/styles';
import { symbolTabs as tabs } from '../constans';

import type { SymbolPageIdsType as PageIds } from '../constans';

const SymbolEditor = () => {
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
        align="center"
        activeTabId={activePageId}
        onTabChange={changeTab}
        horizental={false}
      />

      <PageSwitch pageId={activePageId}>
        <Page id="symbol">
          <EditorWrapper>
            {/* <SetIcon />
            <SetSize property="icon-size" /> */}
          </EditorWrapper>
        </Page>
        <Page id="other">
          <EditorWrapper>{/* <SetOpacity /> */}</EditorWrapper>
        </Page>
        <Page id="title">
          <EditorWrapper>{/* <SetTitle /> */}</EditorWrapper>
        </Page>
      </PageSwitch>
    </LayerComponent>
  );
};

export default SymbolEditor;
