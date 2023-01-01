import { atom } from 'jotai';

const titleState = atom<string | undefined>(undefined);
const columnsState = atom<string[] | undefined>(undefined);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const distictState = atom<((arg: string) => Promise<any>) | undefined>(
  undefined
);

export { titleState, columnsState, distictState };
