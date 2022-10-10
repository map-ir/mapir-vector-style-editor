import React, { useState } from 'react';
import { useAtomValue } from 'jotai';
import { usePopper } from 'react-popper';

import Sample from 'common/sample';
import Portal from 'common/portal';

import { selectedLayerIDState, spriteState } from 'atoms/map';

const SetIcon = () => {
  const openLayerID = useAtomValue(selectedLayerIDState);
  const sprite = useAtomValue(spriteState);

  const [iconRef, setIconRef] = useState<HTMLDivElement | null>(null);
  const [iconWrapperRef, setIconWrapperRef] = useState<HTMLDivElement | null>(
    null
  );

  const [isIconsOpen, setIconsOpen] = useState(false);
  const [icons, setIcons] = useState<any>();

  const { styles, attributes } = usePopper(iconWrapperRef, iconRef, {
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
      .then((res) => setIcons(res));
  };

  return (
    <>
      <Sample
        ref={(el) => setIconRef(el)}
        onClick={setIconsOpen.bind(null, !isIconsOpen)}
      />
      {isIconsOpen && (
        <Portal>
          <div
            ref={(el) => {
              setIconWrapperRef(el);
            }}
            style={styles.popper}
            {...attributes.popper}
          >
            {icons.map((icon) => (
              <div key={}>
                <Sample x={icon.x} y={icon.y} />
              </div>
            ))}
          </div>
        </Portal>
      )}
    </>
  );
};

export default SetIcon;
