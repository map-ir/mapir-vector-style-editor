/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useMemo, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { usePopper } from 'react-popper';
import styled, { css } from 'styled-components';
import { FormattedMessage } from 'react-intl';

import Sample from 'common/sample';
import Portal from 'common/portal';
import useOutsideClickHandler from 'hooks/useOutsideClickHandler';
import updateStyle from 'common/utils/update-style';
import { Row } from 'common/styles';

import {
  selectedLayerIDState,
  spriteState,
  mapState,
  styleObjState,
  layerState,
} from 'atoms/map';

import type { SymbolLayerSpecification } from 'maplibre-gl';
import type { Icon } from '../../types/map';

const SetIcon = () => {
  const map = useAtomValue(mapState);
  const openLayerID = useAtomValue(selectedLayerIDState);
  const sprite = useAtomValue(spriteState);
  const setStyleObj = useSetAtom(styleObjState);
  const layer = useAtomValue(layerState);

  const [iconRef, setIconRef] = useState<HTMLDivElement | null>(null);
  const [iconWrapperRef, setIconWrapperRef] = useState<HTMLDivElement | null>(
    null
  );

  const [isIconsOpen, setIconsOpen] = useState(false);
  const [icons, setIcons] = useState<Icon>();
  const [iconName, setIconName] = useState<string>();

  const { styles, attributes } = usePopper(iconRef, iconWrapperRef, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  const getIcons = (spriteURL: string) => {
    void fetch(`${spriteURL}.json`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res: Icon) => setIcons(res));
  };

  useEffect(() => {
    if (sprite) getIcons(sprite);
  }, [sprite]);

  useEffect(() => {
    setIconName(
      ((layer as SymbolLayerSpecification)?.layout?.['icon-image'] ??
        'empty-e71566') as string
    );
  }, [layer]);

  useOutsideClickHandler(
    useMemo(() => ({ current: iconWrapperRef }), [iconWrapperRef]),
    (e: MouseEvent) => {
      if (!iconRef?.contains(e.target as Node)) setIconsOpen(false);
    }
  );

  return (
    <Row>
      <FormattedMessage id="symbol_type" />
      {iconName ? (
        <Sample
          title={iconName}
          ref={(el) => setIconRef(el)}
          onClick={setIconsOpen.bind(null, !isIconsOpen)}
          img={`${sprite}.png`}
          x={icons?.[iconName]?.x}
          y={icons?.[iconName]?.y}
          width={icons?.[iconName]?.width}
          height={icons?.[iconName]?.height}
        />
      ) : (
        <Sample
          ref={(el) => setIconRef(el)}
          onClick={setIconsOpen.bind(null, !isIconsOpen)}
        />
      )}
      {icons && isIconsOpen && (
        <Portal>
          <IconWrapper
            ref={(el) => {
              setIconWrapperRef(el);
            }}
            style={styles.popper}
            {...attributes.popper}
          >
            <Wrap
              style={{
                gridColumn: '1 / 5',
                width: '100%',
                textAlign: 'center',
              }}
              selected={iconName === ''}
              onClick={() => {
                if (openLayerID && map)
                  updateStyle(
                    openLayerID,
                    map,
                    'layout',
                    'icon-image',
                    '',
                    setStyleObj
                  );
              }}
            >
              <FormattedMessage id="no-value" />
            </Wrap>
            {Object.entries(icons)?.map(([key, icon]) => (
              <Wrap key={key} selected={iconName === key}>
                <Sample
                  key={key}
                  img={`${sprite}.png`}
                  x={icon.x}
                  y={icon.y}
                  width={icon.width}
                  height={icon.height}
                  title={key}
                  onClick={() => {
                    if (openLayerID && map)
                      updateStyle(
                        openLayerID,
                        map,
                        'layout',
                        'icon-image',
                        `${key}`,
                        setStyleObj
                      );
                  }}
                />
              </Wrap>
            ))}
          </IconWrapper>
        </Portal>
      )}
    </Row>
  );
};

export default SetIcon;

const IconWrapper = styled.div`
  display: grid;
  grid-template: auto / repeat(4, auto);
  place-items: center;
  gap: 1ch;
  height: 10em;
  background-color: var(--SE-light-1);
  border: 1px solid var(--SE-shade-4);
  border-radius: var(--SE-radius-8);
  padding: 0.5em;
  box-shadow: 0 0 5px 0 var(--SE-shade-4);
  overflow: hidden;
  overflow-y: auto;
  z-index: 1000;
`;

const Wrap = styled.div<{ selected?: boolean }>`
  cursor: pointer;
  padding: 0.5em;
  border-radius: var(--SE-radius-4);
  font-family: var(--SE-font-family);
  ${(p) =>
    p.selected &&
    css`
      background-color: var(--SE-color-primary-20);
    `}
  &:hover {
    background-color: var(--SE-color-primary-20);
  }
`;
