import { atom } from 'jotai';

const titleState = atom<string | undefined>(undefined);
const columnsState = atom<string[] | undefined>(undefined);

export { titleState, columnsState };
