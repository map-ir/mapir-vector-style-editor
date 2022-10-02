import React, { memo, CSSProperties } from 'react';
import styled from 'styled-components/macro';
import styledMap from 'styled-map';

interface IButtonProps {
  id?: string;
  className?: string;
  children?: JSX.Element | string;
  style?: CSSProperties;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  error?: boolean;
  success?: boolean;
  cancel?: boolean;
  deactive?: boolean;
  default?: boolean;
  large?: boolean;
  medium?: boolean;
  loading?: boolean;
  icon?: JSX.Element;
  iconPath?: string;
  to?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.SyntheticEvent) => void;
  disable?: boolean;
  off?: boolean;
}

function Button({
  id,
  className,
  children,
  style,
  loading,
  disable,
  off,
  iconPath,
  icon,
  to,
  type,
  onClick,
  ...styleProps
}: IButtonProps) {
  const ButtonComponent = (
    <StyledButton
      id={id}
      className={className}
      style={style}
      type={type}
      onClick={onClick}
      disabled={loading || disable}
      off={disable || off}
      {...styleProps}
    >
      {icon ? icon : iconPath ? <Icon src={iconPath} /> : null}
      <Content>{!loading ? children : ''}</Content>
    </StyledButton>
  );

  return ButtonComponent;
}

export default memo(Button);

interface IIconProps {
  src: string;
}

const StyledButton = styled.button<{ off?: boolean }>`
  cursor: ${styledMap`
    disabled: unset;
    off: unset;
    default: pointer;
  `};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1em;
  padding: 0.7em 1em;
  outline: none;
  border: none;
  border-radius: 10px;
  box-shadow: ${styledMap`
    cancel: none;
    default: 0 3px 6px 0 var(--shadow-1);
  `};
  background-color: ${styledMap`
    error: var(--error);
    success: var(--success);
    cancel: #e7e7e7;
    deactive: var(--light-4);
    secondary: var(--color-secondary);
    primary: var(--color-primary);
    tertiary: trasparent;
    default: var(--shade-3);
  `};
  color: ${styledMap`
    tertiary: var(--shade-3);
    cancel: var(--light-4);
    default: white;
  `};
  height: ${styledMap`
    large: 3em;
    default: unset;
  `};
  font-size: ${styledMap`
    default: 1em;
  `};
  filter: ${styledMap`
    off: grayscale(1);
    default: unset;
  `};
`;

const Icon = styled.i<IIconProps>`
  display: inline-block;
  height: 1em;
  width: 1em;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const Content = styled.span`
  height: 1rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  flex-grow: 1;
`;
