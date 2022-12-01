/// <reference types="react" />
type Renderee = JSX.Element | null;
interface IPageSwitchProps {
    children: Renderee | Renderee[];
    pageIndex?: number;
    pageId?: string;
}
declare const PageSwitch: ({ children, pageIndex, pageId, }: IPageSwitchProps) => JSX.Element | null;
interface IPageProps {
    children: Renderee;
    id?: string;
}
declare const Page: ({ children }: IPageProps) => Renderee;
export { Page, PageSwitch };
