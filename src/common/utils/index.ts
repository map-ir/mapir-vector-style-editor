/** Determines value is not undefined or null. */
export const isValue = <T>(value: T | undefined | null): value is T =>
  (value as T) !== undefined && (value as T) !== null;

/** Converts string-likes to number. */
export const toNumber = (s: string | number) =>
  typeof s === 'string' ? parseFloat(s) : s;

/** Removes anything other than numbers from a string. useful for number inputs */
export const toNumberString = (str: string) =>
  str
    ?.split('')
    ?.map((c) => parseFloat(c))
    ?.filter((i) => !Number.isNaN(i))
    ?.join('');

/** Converts numbers in a string to Farsi (persian) numebrs */
export const toFaDigits = function (input: string | number) {
  input = input.toString();
  if (!input) return '';
  const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return input.replace(/[0-9]/g, function (w) {
    return id[+w];
  });
};

/** Converts numbers in a string to English numebrs */
export const toEnDigits = function (input: string | number) {
  input = input.toString();
  if (!input) return '';
  return input.replace(/[۰-۹]/g, function (chr) {
    const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return persian.indexOf(chr).toString();
  });
};

export function splitArray(flatArray: (string | number)[], numCols: number) {
  const newArray = [] as (string | number)[][];
  for (let i = 0; i < flatArray.length / numCols; i++) {
    newArray.push(flatArray.slice(numCols * i, numCols * i + numCols));
  }
  return newArray;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce(callback: (...args: any[]) => any, wait: number) {
  let timeoutId: number | undefined = undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      // eslint-disable-next-line prefer-spread
      callback.apply(null, args);
    }, wait);
  };
}
