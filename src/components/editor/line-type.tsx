/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useAtomValue, useSetAtom } from 'jotai';

import { Row, Selector, Label, Icon } from 'common/styles';
import updateStyle from 'common/utils/update-style';

import {
  mapState,
  selectedLayerIDState,
  styleObjState,
  layerState,
} from 'atoms/map';

import { ReactComponent as Solid } from '../../assets/icons/solid-line.svg';
import { ReactComponent as Dash } from '../../assets/icons/dash-line.svg';
import { ReactComponent as Dot } from '../../assets/icons/dot-line.svg';
import { ReactComponent as Miter } from '../../assets/icons/miter-join.svg';
import { ReactComponent as Bevel } from '../../assets/icons/bevel-join.svg';
import { ReactComponent as Round } from '../../assets/icons/round-join.svg';

const SetLineType = () => {
  const map = useAtomValue(mapState);
  const openLayerID = useAtomValue(selectedLayerIDState);
  const setStyleObj = useSetAtom(styleObjState);
  const layer = useAtomValue(layerState);

  const [join, setJoin] = useState<'bevel' | 'round' | 'miter'>('miter');
  const [dash, setDash] = useState<number[]>([1, 0]);

  useEffect(() => {
    // @ts-ignore line
    setJoin(layer?.layout?.['line-join'] ?? 'miter');
    // @ts-ignore line
    setDash(layer?.paint?.['line-dasharray'] ?? [1, 0]);
  }, [layer]);

  return (
    <Row>
      <Selector style={{ width: '50%', gap: '0.5em' }}>
        <Label style={{ width: '5ch' }}>
          <FormattedMessage id="line" />
        </Label>
        <Icon
          bg={
            JSON.stringify(dash) === JSON.stringify([1, 0])
              ? 'var(--SE-color-primary-20)'
              : 'var(--SE-light-1)'
          }
          onClick={() =>
            map &&
            openLayerID &&
            updateStyle(
              openLayerID,
              map,
              'paint',
              'line-dasharray',
              [1, 0],
              setStyleObj
            )
          }
        >
          <Solid
            color={
              JSON.stringify(dash) === JSON.stringify([1, 0])
                ? 'var(--SE-color-primary)'
                : 'var(--SE-shade-3)'
            }
          />
        </Icon>
        <Icon
          bg={
            JSON.stringify(dash) === JSON.stringify([2, 2])
              ? 'var(--SE-color-primary-20)'
              : 'var(--SE-light-1)'
          }
          onClick={() =>
            map &&
            openLayerID &&
            updateStyle(
              openLayerID,
              map,
              'paint',
              'line-dasharray',
              [2, 2],
              setStyleObj
            )
          }
        >
          <Dash
            color={
              JSON.stringify(dash) === JSON.stringify([2, 2])
                ? 'var(--SE-color-primary)'
                : 'var(--SE-shade-3)'
            }
          />
        </Icon>
        <Icon
          bg={
            JSON.stringify(dash) === JSON.stringify([1, 2])
              ? 'var(--SE-color-primary-20)'
              : 'var(--SE-light-1)'
          }
          onClick={() =>
            map &&
            openLayerID &&
            updateStyle(
              openLayerID,
              map,
              'paint',
              'line-dasharray',
              [1, 2],
              setStyleObj
            )
          }
        >
          <Dot
            color={
              JSON.stringify(dash) === JSON.stringify([1, 2])
                ? 'var(--SE-color-primary)'
                : 'var(--SE-shade-3)'
            }
          />
        </Icon>
      </Selector>
      <Selector style={{ width: '50%', gap: '0.5em' }}>
        <Label style={{ width: '6ch' }}>
          <FormattedMessage id="join" />
        </Label>
        <Icon
          bg={
            join === 'miter'
              ? 'var(--SE-color-primary-20)'
              : 'var(--SE-light-1)'
          }
          onClick={() =>
            map &&
            openLayerID &&
            updateStyle(
              openLayerID,
              map,
              'layout',
              'line-join',
              'miter',
              setStyleObj
            )
          }
        >
          <Miter
            color={
              join === 'miter' ? 'var(--SE-color-primary)' : 'var(--SE-shade-3)'
            }
          />
        </Icon>
        <Icon
          bg={
            join === 'bevel'
              ? 'var(--SE-color-primary-20)'
              : 'var(--SE-light-1)'
          }
          onClick={() =>
            map &&
            openLayerID &&
            updateStyle(
              openLayerID,
              map,
              'layout',
              'line-join',
              'bevel',
              setStyleObj
            )
          }
        >
          <Bevel
            color={
              join === 'bevel' ? 'var(--SE-color-primary)' : 'var(--SE-shade-3)'
            }
          />
        </Icon>
        <Icon
          bg={
            join === 'round'
              ? 'var(--SE-color-primary-20)'
              : 'var(--SE-light-1)'
          }
          onClick={() =>
            map &&
            openLayerID &&
            updateStyle(
              openLayerID,
              map,
              'layout',
              'line-join',
              'round',
              setStyleObj
            )
          }
        >
          <Round
            color={
              join === 'round' ? 'var(--SE-color-primary)' : 'var(--SE-shade-3)'
            }
          />
        </Icon>
      </Selector>
    </Row>
  );
};

export default SetLineType;
