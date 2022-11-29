declare const titleState: import("jotai").PrimitiveAtom<string | undefined> & {
    init: string | undefined;
};
declare const columnsState: import("jotai").PrimitiveAtom<string[] | undefined> & {
    init: string[] | undefined;
};
export { titleState, columnsState };
