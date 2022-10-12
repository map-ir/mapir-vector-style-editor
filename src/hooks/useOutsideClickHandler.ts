import { useEffect } from 'react';
import type { RefObject } from 'react';

export default function useOutsideClickHandler(
  ref: RefObject<HTMLDivElement>,
  handler: (event: MouseEvent) => void
): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // @ts-ignore line
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
