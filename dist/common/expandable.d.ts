/// <reference types="react" />
import type { Renderable } from 'types/general';
interface IExpandableProps {
    open: boolean;
    onOpen?: () => void;
    className?: string;
    isExpandable?: boolean;
    HeaderRenderer?: () => JSX.Element | null;
    children?: Renderable;
}
declare function Expandable({ className, children, HeaderRenderer, open, onOpen, isExpandable, }: IExpandableProps): JSX.Element;
export default Expandable;
