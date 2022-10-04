/* eslint-disable @typescript-eslint/indent */
import { isValue } from './utils';

type Renderee = JSX.Element | null;

interface IPageSwitchProps {
  children: Renderee | Renderee[];
  pageIndex?: number;
  pageId?: string;
}

const PageSwitch = ({
  children,
  pageIndex = 0,
  pageId,
}: IPageSwitchProps): JSX.Element | null => {
  if (!children) return null;
  else if (!Array.isArray(children)) return children;
  return pageId
    ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      children.find((i) => i?.props?.id === pageId) ?? null
    : isValue(pageIndex)
    ? children[pageIndex] ?? null
    : null;
};

interface IPageProps {
  children: Renderee;
  id?: string;
}

const Page = ({ children }: IPageProps) => children;

export { Page, PageSwitch };
