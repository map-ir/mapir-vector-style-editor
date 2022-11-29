import type { RefObject } from 'react';
export default function useOutsideClickHandler(ref: RefObject<HTMLDivElement>, handler: (event: MouseEvent) => void): void;
