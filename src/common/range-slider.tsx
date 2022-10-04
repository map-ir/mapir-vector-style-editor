import React, { memo } from 'react';
import Styled from 'styled-components/macro';
import { Root, Track, Range, Thumb } from '@radix-ui/react-slider';
import type { SliderProps } from '@radix-ui/react-slider';

const RangeSlider = (props: SliderProps) => (
  <StyledSlider {...props}>
    <StyledThumb />
    <StyledTrack>
      <StyledRange />
    </StyledTrack>
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
    width: 200px;

    &[data-orientation="horizontal"] {
    height: 20px;
    };

    &[data-orientation="vertical"] {
    flex-direction: column;
    width: 20px;
    height: 100px;
    };
`;

const StyledTrack = Styled(Track)`
    background-Color: var(--shade-3);
    position: relative;
    flex-grow: 1;
    border-radius: 9999px;

    &[data-orientation="horizontal"] { height: 3px; };,
    &[data-orientation="vertical"] { width: 3px; };
`;

const StyledRange = Styled(Range)`
    position: absolute;
    background-color: var(--shade-1);
    border-radius: 9999px;
    height: 100%;
`;

const StyledThumb = Styled(Thumb)`
    all: unset;
    display: block;
    width: 1em;
    height: 1em;
    background-color: var(--shade-1);
    box-shadow: 0 2px 10px var(--shade-3);
    border-radius: 50%;
    z-index: 9999;
    &:focus { box-shadow: 0 0 0 2px var(--shade-3); };
`;
