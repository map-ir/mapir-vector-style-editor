import React, { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { usePopper } from 'react-popper';
import styled from 'styled-components/macro';
import { FormattedMessage } from 'react-intl';

import Sample from 'common/sample';
import Portal from 'common/portal';

import {
  selectedLayerIDState,
  spriteState,
  styleObjState,
  mapState,
} from 'atoms/map';

import type { SymbolLayer } from 'mapbox-gl';
import type { Icon } from 'types/map';

const SetIcon = () => {
  const styleObj = useAtomValue(styleObjState);
  const map = useAtomValue(mapState);
  const openLayerID = useAtomValue(selectedLayerIDState);
  const sprite = useAtomValue(spriteState);

  const [layer, setLayer] = useState<SymbolLayer | undefined>(undefined);
  const [iconRef, setIconRef] = useState<HTMLDivElement | null>(null);
  const [iconWrapperRef, setIconWrapperRef] = useState<HTMLDivElement | null>(
    null
  );

  const [isIconsOpen, setIconsOpen] = useState(false);
  const [icons, setIcons] = useState<Icon>();

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

  const getIcons = () => {
    void fetch(`${sprite}.json`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res: Icon) => setIcons(res));
  };

  useEffect(() => {
    if (sprite) getIcons();
  }, [sprite]);

  useEffect(() => {
    if (openLayerID)
      setLayer(
        styleObj?.layers?.find((l) => l.id === openLayerID) as SymbolLayer
      );
  }, [openLayerID]);

  const iconName = (layer?.layout?.['icon-image'] ?? 'empty-e71566') as string;

  return (
    <Row>
      <FormattedMessage id="symbol_type" />
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
      {isIconsOpen && (
        <Portal>
          <IconWrapper
            ref={(el) => {
              setIconWrapperRef(el);
            }}
            style={styles.popper}
            {...attributes.popper}
          >
            {Object.entries(icons ?? {})?.map(([key, icon]) => (
              <Sample
                key={key}
                img={`${sprite}.png`}
                x={icon.x}
                y={icon.y}
                width={icon.width}
                height={icon.height}
                title={key}
                onClick={() =>
                  openLayerID &&
                  map &&
                  map?.setLayoutProperty(openLayerID, 'icon-image', `${key}`)
                }
              />
            ))}
          </IconWrapper>
        </Portal>
      )}
    </Row>
  );
};

export default SetIcon;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: grid;
  grid-template: auto / repeat(4, auto);
  place-items: center;
  height: 10em;
  overflow-y: auto;
  background-color: var(--light-1);
`;
