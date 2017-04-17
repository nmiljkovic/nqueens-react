export const range = (from: number, to: number): number[] => (
  Array.from(Array(to).keys()).slice(from)
);
