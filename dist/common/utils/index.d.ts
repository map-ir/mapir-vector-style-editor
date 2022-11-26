/** Determines value is not undefined or null. */
export declare const isValue: <T>(value: T | null | undefined) => value is T;
/** Converts string-likes to number. */
export declare const toNumber: (s: string | number) => number;
/** Removes anything other than numbers from a string. useful for number inputs */
export declare const toNumberString: (str: string) => string;
/** Converts numbers in a string to Farsi (persian) numebrs */
export declare const toFaDigits: (input: string | number) => string;
/** Converts numbers in a string to English numebrs */
export declare const toEnDigits: (input: string | number) => string;
export declare function splitArray(flatArray: (string | number)[], numCols: number): (string | number)[][];
