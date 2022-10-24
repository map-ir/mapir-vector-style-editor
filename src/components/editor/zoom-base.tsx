/* eslint-disable @typescript-eslint/indent */
import React, { useState, useCallback, useMemo, useEffect, memo } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components/macro';

import SectionTab from 'common/section-tab';
import InputNumber from 'common/input-number';
import { PageSwitch, Page } from 'common/page-switch';
import { Column, Row } from 'common/styles';
import Sample from 'common/sample';
import Gradiant from 'common/gradiant';
import { splitArray, toFaDigits } from 'common/utils';
import updateStyle from 'common/utils/update-style';
import useGetSelectedLayer from 'hooks/useGetSelectedLayer';

import { mapState, selectedLayerIDState, styleObjState } from 'atoms/map';

import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';

import type { Expression, StyleFunction } from 'mapbox-gl';

interface IProps {
  type: 'size' | 'color' | 'stroke';
  property:
    | 'icon-size'
    | 'circle-radius'
    | 'line-width'
    | 'stroke-width'
    | 'fill-color'
    | 'circle-color'
    | 'line-color';
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

const ZoomBase = ({ type, property }: IProps) => {
  const intl = useIntl();
  const map = useAtomValue(mapState);
  const openLayerID = useAtomValue(selectedLayerIDState);
  const setStyleObj = useSetAtom(styleObjState);
  const { layer } = useGetSelectedLayer();

  const styleKey = [
    'icon-size',
    'circle-radius',
    'line-width',
    'stroke-width',
  ].includes(property)
    ? 'layout'
    : 'paint';

  const [pairs, setPairs] = useState<(number | string)[][]>([]); // Pairs of zoom/value or zoom/color
  const [expoPower, setexpoPower] = useState<number>(0.5);
  const [cubicPoints, setCubicPoints] = useState<number[][]>([
    [1, 1],
    [1, 1],
  ]);

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

  useEffect(() => {
    // @ts-ignore line
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
        [minzoom, type === 'color' ? 'blue' : 1],
        [maxzoom, type === 'color' ? 'red' : 1],
      ]);
    }
  }, [layer]);

  const applyStyles = useCallback(() => {
    if (openLayerID && map) {
      const value: number | Expression | StyleFunction = [
        'interpolate',
        activePageId === 'cubic-bezier'
          ? ([activePageId] as (number | string)[]).concat(cubicPoints.flat())
          : activePageId === 'exponential'
          ? ([activePageId] as (number | string)[]).concat([expoPower])
          : [activePageId],
        ['zoom'],
        ...pairs.flat(),
      ];
      console.log(
        '🚀 ~ file: zoom-base.tsx ~ line 104 ~ useEffect ~ value',
        value
      );
      //   updateStyle(openLayerID, map, 'layout', property, value, setStyleObj);
    }
  }, [openLayerID, map, pairs, activePageId, property]);

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
                  onChange={(value) => setexpoPower(value)}
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
                  onChange={(value) =>
                    setCubicPoints((curr) => [[value, curr[0][1]], curr[1]])
                  }
                />
                Y1:{' '}
                <InputNumber
                  min={0}
                  max={1}
                  value={cubicPoints[0][1]}
                  onChange={(value) =>
                    setCubicPoints((curr) => [[curr[0][0], value], curr[1]])
                  }
                />
              </PairsWrap>
              <PairsWrap>
                X2:{' '}
                <InputNumber
                  min={0}
                  max={1}
                  value={cubicPoints[1][0]}
                  onChange={(value) =>
                    setCubicPoints((curr) => [curr[0], [value, curr[1][1]]])
                  }
                />
                Y2:{' '}
                <InputNumber
                  min={0}
                  max={1}
                  value={cubicPoints[1][1]}
                  onChange={(value) =>
                    setCubicPoints((curr) => [curr[0], [curr[1][0], value]])
                  }
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
              setPairs((curr) => {
                const temp = [...curr];
                temp.push([
                  Math.floor(
                    ((temp[0][0] as number) + (temp[1][0] as number)) / 2
                  ),
                  type === 'color' ? 'yellow' : 1,
                ]);
                return temp.sort((a, b) => (a[0] as number) - (b[0] as number));
              });
              applyStyles();
            }}
          />
        </StyledRow>
        {pairs?.map((pair, index) => (
          <StyledRow key={index}>
            <PairsWrap>
              {type === 'color' ? (
                <Sample color={pair?.[1] as string} />
              ) : (
                <InputNumber
                  value={pair?.[1] as number}
                  onChange={(value) => {
                    setTimeout(() => {
                      setPairs((curr) => {
                        const temp = [...curr];
                        temp[index] = [temp[index][0], value];
                        return temp;
                      });
                    }, 100);
                    applyStyles();
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
                  setPairs((curr) => {
                    const temp = [...curr];
                    temp[index] = [value, temp[index][1]];
                    return temp;
                  });
                  applyStyles();
                }}
              />{' '}
              {/* zoom */}
            </PairsWrap>
            <Delete
              style={{ cursor: 'pointer' }}
              color={'var(--color-primary)'}
              onClick={() => {
                setPairs((curr) =>
                  curr.filter((c, index2) => index !== index2)
                );
                applyStyles();
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
