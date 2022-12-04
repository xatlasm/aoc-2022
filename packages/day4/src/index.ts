import * as fs from 'fs/promises';

// part 1

const input = await fs.readFile('src/input.txt', { encoding: 'utf8' });
const destructuredPairs = input
  .split('\n')
  .map((line) => line.split(','))
  .map((pair) => {
    const [firstStart, firstEnd] = pair[0]
      .split('-')
      .map((piece) => Number(piece));
    const [secondStart, secondEnd] = pair[1]
      .split('-')
      .map((piece) => Number(piece));
    return { firstStart, firstEnd, secondStart, secondEnd };
  });

const fullOverlaps = destructuredPairs.map(
  ({ firstStart, firstEnd, secondStart, secondEnd }) =>
    (firstStart <= secondStart && firstEnd >= secondEnd) ||
    (secondStart <= firstStart && secondEnd >= firstEnd)
      ? 1
      : 0
);
const fullSum = fullOverlaps.reduce(
  (sum: number, overlap: number) => sum + overlap,
  0
);

console.log(`Part 1 solution: ${fullSum}`);

// part 2
const partialOverlaps = destructuredPairs.map(
  ({ firstStart, firstEnd, secondStart, secondEnd }) =>
    firstEnd < secondStart || secondEnd < firstStart ? 0 : 1
);
const partialSum = partialOverlaps.reduce(
  (sum: number, partial: number) => sum + partial,
  0
);
console.log(`Part 2 solution: ${partialSum}`);
