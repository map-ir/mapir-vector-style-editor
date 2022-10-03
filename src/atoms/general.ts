import { atom } from 'jotai';

const titleState = atom<string | undefined>(undefined);

export { titleState };
