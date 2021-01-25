export function makeIterator<T>(array: T[]): Iterator<T> {
  let nextIndex = 0;
  return {
    next() {
      return nextIndex < array.length
        ? {
            value: array[nextIndex++],
            done: false,
          }
        : {
            value: undefined,
            done: true,
          };
    },
  };
}
