import React, { memo } from 'react';
import Styled from 'styled-components';
import { Root, Track, Range, Thumb } from '@radix-ui/react-slider';
import type { SliderProps } from '@radix-ui/react-slider';

interface IProps extends SliderProps {
  pairs: (string | number)[][];
}

const Gradiant = ({ pairs, ...props }: IProps) => {
  const bgColor = `linear-gradient(to right, ${pairs
    ?.map(
      (p) =>
        `${p?.[1]} ${
          ((p?.[0] as number) * 100) / ((props?.max ?? 20) - (props?.min ?? 1))
        }%`
    )
    .join(', ')})`;
  return (
    <StyledSlider {...props} value={pairs?.map((p) => p?.[0] as number)}>
      <StyledTrack>
        <StyledRange color={bgColor} />
      </StyledTrack>
      {pairs?.map((p, index) => (
        <StyledThumb key={index} title={p?.[0] as string} />
      ))}
    </StyledSlider>
  );
};

export default memo(Gradiant);

const StyledSlider = Styled(Root)`
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;
    touch-action: none;
    width: calc(100% - 10em);

    &[data-orientation="horizontal"] {
    height: 100%;
    };

    &[data-orientation="vertical"] {
    flex-direction: column;
    width: 20px;
    height: 100px;
    };
`;

const StyledTrack = Styled(Track)`
    background-color: var(--SE-shade-3);
    position: relative;
    flex-grow: 1;
    border-radius: 9999px;

    &[data-orientation="horizontal"] { height: 0.5em; };,
    &[data-orientation="vertical"] { width: 0.5em; };
`;

const StyledRange = Styled(Range)<{ color?: string }>`
    position: absolute;
    background: ${(p) => (p.color ? p.color : 'var(--SE---SE-shade-1)')};
    border-radius: 9999px;
    height: 100%;
`;

const StyledThumb = Styled(Thumb)`
    all: unset;
    display: block;
    width: 0.5em;
    height: 0.5em;
    background-color: transparent;
    border-radius: 50%;
    z-index: 9999;
    border: 2px solid;
    &:focus { box-shadow: 0 0 0 2px var(--SE-shade-4); };
`;
