import React, { memo } from 'react';
import Styled from 'styled-components';
import { Root, Track, Range, Thumb } from '@radix-ui/react-slider';
import type { SliderProps } from '@radix-ui/react-slider';

const RangeSlider = (props: SliderProps) => (
  <StyledSlider {...props}>
    <StyledTrack>
      <StyledRange />
    </StyledTrack>
    <StyledThumb />
    <StyledThumb />
  </StyledSlider>
);

export default memo(RangeSlider);

const StyledSlider = Styled(Root)`
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;
    touch-action: none;
    width: calc(100% - 4em);

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

    &[data-orientation="horizontal"] { height: 0.3em; };,
    &[data-orientation="vertical"] { width: 0.3em; };
`;

const StyledRange = Styled(Range)`
    position: absolute;
    background-color: var(--SE-shade-1);
    border-radius: 9999px;
    height: 100%;
`;

const StyledThumb = Styled(Thumb)`
    all: unset;
    display: block;
    width: 0.6em;
    height: 0.6em;
    background-color: var(--SE-shade-1);
    border-radius: 50%;
    z-index: 9999;
    &:focus { box-shadow: 0 0 0 2px var(--SE-shade-4); };
`;
