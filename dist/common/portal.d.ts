/// <reference types="react" />
interface IPortalProps {
    children: JSX.Element;
    parent?: Element;
    className?: string;
}
export default function Portal({ children, parent, className }: IPortalProps): import("react").ReactPortal;
export {};
