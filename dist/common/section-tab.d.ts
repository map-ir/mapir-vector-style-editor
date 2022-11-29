/// <reference types="react" />
export interface ITab {
    id: string;
    disabled?: boolean;
}
interface ITabs {
    className?: string;
    tabs: ITab[];
    activeTabId?: ITab['id'];
    onTabChange?: (id: ITab['id']) => void;
    align?: 'center' | 'start' | 'end';
    horizental?: boolean;
    secondry?: boolean;
}
declare const SectionTab: ({ className, tabs, activeTabId, onTabChange, align, horizental, secondry, }: ITabs) => JSX.Element;
export default SectionTab;
