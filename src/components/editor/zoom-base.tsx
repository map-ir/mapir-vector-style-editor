/* eslint-disable @typescript-eslint/indent */
import React, { useState, useCallback, useEffect, memo, useMemo } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components/macro';

import SectionTab from 'common/section-tab';
import InputNumber from 'common/input-number';
import { PageSwitch, Page } from 'common/page-switch';
import { Column, Row } from 'common/styles';
import ColorPicker from 'common/color-picker';
import Gradiant from 'common/gradiant';
import { splitArray, toFaDigits } from 'common/utils';
import updateStyle from 'common/utils/update-style';
import useGetSelectedLayer from 'hooks/useGetSelectedLayer';
import useGetStyleKey from 'hooks/useGetStyleKey';

import { mapState, selectedLayerIDState, styleObjState } from 'atoms/map';

import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';

import type { Expression, StyleFunction } from 'mapbox-gl';

interface IProps {
  type: 'size' | 'color' | 'stroke';
}

const pageIds = ['linear', 'exponential', 'cubic-bezier'] as const;
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
    id: 'cubic-bezier',
    disabled: false,
  },
];

const ZoomBase = ({ type }: IProps) => {
  const intl = useIntl();
  const map = useAtomValue(mapState);
  const openLayerID = useAtomValue(selectedLayerIDState);
  const setStyleObj = useSetAtom(styleObjState);
  const { layer } = useGetSelectedLayer();
  const { styleKey, property } = useGetStyleKey(type);

  const [pairs, setPairs] = useState<(number | string)[][]>([]); // Pairs of zoom/value or zoom/color
  const [expoPower, setexpoPower] = useState<number>(0.5);
  const [cubicPoints, setCubicPoints] = useState<number[][]>([
    [1, 1],
    [1, 1],
  ]);

  const [activePageId, setActivePageId] = useState<PageIds>(
    () => tabs?.filter((i) => !i.disabled).slice(0)[0].id as PageIds
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

  useEffect(() => {
    const arg = styleValue(pairs) as number | Expression | StyleFunction;
    applyStyles(arg);
  }, [activePageId]);

  useEffect(() => {
    // @ts-ignore line
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const expression = layer?.[styleKey]?.[property];
    const minzoom = layer?.minzoom ?? 1;
    const maxzoom = layer?.maxzoom ?? 20;

    if ((expression as string[])?.[0] === 'interpolate') {
      if ((expression as string[])?.[1][0] === 'exponential') {
        setexpoPower((expression as number[][])?.[1][1]);
      } else if ((expression as string[])?.[1][0] === 'cubic-bezier') {
        setCubicPoints(
          splitArray((expression as string[][])[1]?.slice(1), 2) as number[][]
        );
      }
      setActivePageId((expression as string[])?.[1][0] as PageIds);
      setPairs(splitArray((expression as string[])?.slice(3), 2));
    } else {
      setPairs([
        [minzoom, expression ?? (type === 'color' ? '#7BA6CD' : 1)],
        [maxzoom, expression ?? (type === 'color' ? '#C11010' : 1)],
      ]);
    }
  }, [layer]);

  const styleValue = useCallback(
    (value: (number | string)[][]) => [
      'interpolate',
      activePageId === 'cubic-bezier'
        ? ([activePageId] as (number | string)[]).concat(cubicPoints.flat())
        : activePageId === 'exponential'
        ? ([activePageId] as (number | string)[]).concat([expoPower])
        : [activePageId],
      ['zoom'],
      ...value.flat(),
    ],
    [activePageId, cubicPoints, expoPower]
  );

  const stylePowerValue = useCallback(
    (expo: number) => [
      'interpolate',
      ([activePageId] as (number | string)[]).concat([expo]),
      ['zoom'],
      ...pairs.flat(),
    ],
    [activePageId, pairs]
  );

  const styleCubicValue = useCallback(
    (cubic: number[][]) => [
      'interpolate',
      ([activePageId] as (number | string)[]).concat(cubic.flat()),
      ['zoom'],
      ...pairs.flat(),
    ],
    [activePageId, pairs]
  );

  const applyStyles = useCallback(
    (value: number | Expression | StyleFunction) => {
      if (openLayerID && map && property && styleKey && pairs.length > 0) {
        updateStyle(openLayerID, map, styleKey, property, value, setStyleObj);
      }
    },
    [openLayerID, map, styleKey, property]
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
          <></>
        </Page>
        <Page id="exponential">
          <Column>
            <Description>
              <Star>*</Star>
              <FormattedMessage id="expo_desc" />
            </Description>
            <Description style={{ justifyContent: 'space-between' }}>
              <FormattedMessage id="expo_power" />
              <PairsWrap style={{ direction: 'ltr', gap: '0.2em' }}>
                {intl.locale === 'fa' ? toFaDigits(2) : 2} ^{' '}
                <InputNumber
                  min={0}
                  max={2}
                  value={expoPower}
                  onChange={(value) => {
                    const arg = stylePowerValue(value) as
                      | number
                      | Expression
                      | StyleFunction;
                    applyStyles(arg);
                  }}
                />
              </PairsWrap>
            </Description>
          </Column>
        </Page>
        <Page id="cubic-bezier">
          <Column>
            <Description>
              <Star>*</Star>
              <FormattedMessage id="cubic_desc" />
            </Description>
            <Row style={{ direction: 'ltr' }}>
              <PairsWrap>
                X1:{' '}
                <InputNumber
                  min={0}
                  max={1}
                  value={cubicPoints[0][0]}
                  onChange={(value) => {
                    styleCubicValue([
                      [value, cubicPoints[0][1]],
                      cubicPoints[1],
                    ]);
                    const arg = styleCubicValue([
                      [value, cubicPoints[0][1]],
                      cubicPoints[1],
                    ]) as number | Expression | StyleFunction;
                    applyStyles(arg);
                  }}
                />
                Y1:{' '}
                <InputNumber
                  min={0}
                  max={1}
                  value={cubicPoints[0][1]}
                  onChange={(value) => {
                    const arg = styleCubicValue([
                      [cubicPoints[0][0], value],
                      cubicPoints[1],
                    ]) as number | Expression | StyleFunction;
                    applyStyles(arg);
                  }}
                />
              </PairsWrap>
              <PairsWrap>
                X2:{' '}
                <InputNumber
                  min={0}
                  max={1}
                  value={cubicPoints[1][0]}
                  onChange={(value) => {
                    styleCubicValue([
                      cubicPoints[0],
                      [value, cubicPoints[1][1]],
                    ]);
                    const arg = styleCubicValue([
                      cubicPoints[0],
                      [value, cubicPoints[1][1]],
                    ]) as number | Expression | StyleFunction;
                    applyStyles(arg);
                  }}
                />
                Y2:{' '}
                <InputNumber
                  min={0}
                  max={1}
                  value={cubicPoints[1][1]}
                  onChange={(value) => {
                    styleCubicValue([
                      cubicPoints[0],
                      [cubicPoints[1][0], value],
                    ]);
                    const arg = styleCubicValue([
                      cubicPoints[0],
                      [cubicPoints[1][0], value],
                    ]) as number | Expression | StyleFunction;
                    applyStyles(arg);
                  }}
                />
              </PairsWrap>
            </Row>
          </Column>
        </Page>
      </PageSwitch>
      <Column>
        <StyledRow>
          {type === 'color' ? (
            <Gradiant
              pairs={pairs}
              min={layer?.minzoom ?? 1}
              max={layer?.maxzoom ?? 20}
              disabled
            />
          ) : (
            <Description>
              <Star>*</Star>مقدار : زوم
            </Description>
          )}
          <Plus
            style={{ cursor: 'pointer' }}
            color={'var(--color-primary)'}
            onClick={() => {
              const temp = [...pairs];
              temp.push([
                Math.floor(
                  ((temp[0][0] as number) + (temp[1][0] as number)) / 2
                ),
                type === 'color' ? '#FFB800' : 1,
              ]);
              const arg = styleValue(
                temp.sort((a, b) => (a[0] as number) - (b[0] as number))
              ) as number | Expression | StyleFunction;
              applyStyles(arg);
            }}
          />
        </StyledRow>
        {pairs?.map((pair, index) => (
          <StyledRow key={index}>
            <PairsWrap>
              {type === 'color' ? (
                // <Sample color={pair?.[1] as string} />
                <ColorPicker
                  value={pair?.[1]}
                  onChange={(e) => {
                    const temp = [...pairs];
                    temp[index] = [
                      temp[index][0],
                      e.target.value.toUpperCase(),
                    ];
                    const arg = styleValue(temp) as
                      | number
                      | Expression
                      | StyleFunction;
                    applyStyles(arg);
                  }}
                />
              ) : (
                <InputNumber
                  value={pair?.[1] as number}
                  onChange={(value) => {
                    const temp = [...pairs];
                    temp[index] = [temp[index][0], value];
                    const arg = styleValue(temp) as
                      | number
                      | Expression
                      | StyleFunction;
                    applyStyles(arg);
                  }}
                />
              )}{' '}
              {/* value or color */}
              :
              <InputNumber
                min={layer?.minzoom ?? 1}
                max={layer?.maxzoom ?? 20}
                value={pair?.[0]}
                onChange={(value) => {
                  const temp = [...pairs];
                  temp[index] = [value, temp[index][1]];
                  const arg = styleValue(temp) as
                    | number
                    | Expression
                    | StyleFunction;
                  applyStyles(arg);
                }}
              />{' '}
              {/* zoom */}
            </PairsWrap>
            <Delete
              style={{ cursor: 'pointer' }}
              color={'var(--color-primary)'}
              onClick={() => {
                const temp = pairs?.filter((c, index2) => index !== index2);
                const arg = styleValue(temp) as
                  | number
                  | Expression
                  | StyleFunction;
                applyStyles(arg);
              }}
            />
          </StyledRow>
        ))}
      </Column>
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

const PairsWrap = styled(Row)`
  justify-content: start;
  gap: 1em;
  padding: 0;
`;

const StyledRow = styled(Row)`
  padding: 0.3em 0;
`;

const Description = styled(Row)`
  justify-content: start;
  gap: 0.3em;
  font-size: smaller;
  font-weight: 300;
  padding: 0;
  color: var(--shade-1);
  text-align: justify;
`;
const Star = styled.span`
  color: var(--color-primary);
`;
