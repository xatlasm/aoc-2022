import * as fs from 'fs/promises';

// part 1
const input = await fs.readFile('src/input.txt', { encoding: 'utf8' });

// parse the columns
const lines = input.split('\n');
const rows = lines.splice(0, 10);

// parse the moves
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const moves = lines.map((line) => line.match(/\d+/g)!.map((n) => Number(n)));

// parse the columns
const columns = rows
  .reduce(
    (newArr, row) => {
      const splitRow = row.split('');

      // pick out the letters in the boxes
      for (let i = 1; i < splitRow.length; i += 4) {
        newArr[(i - 1) / 4].push(splitRow[i]);
      }
      return newArr;
    },
    [...Array(9)].map(() => Array(1).fill(' ')) // TIL how to initialize a 2D array
  )
  .map((col) => col.slice(0, -1).filter((e) => e !== ' '));

// make a clone just in case I'll need it later! 😉
const crates = structuredClone(columns); // TIL structuredClone() since Node 17

// perform the moves
moves.forEach((move) => {
  const [n, s, p] = move;
  const removed = crates[s - 1].splice(0, n);
  crates[p - 1].splice(0, 0, ...removed.reverse());
});

// get the top layer
const sol1 = crates.map((c) => c[0]).join('');
console.log(`Part 1 solution: ${sol1}`); // GRTSWNJHH

// part 2
moves.forEach((move) => {
  const [n, s, p] = move;
  const removed = columns[s - 1].splice(0, n);
  columns[p - 1].splice(0, 0, ...removed);
});
const sol2 = columns.map((c) => c[0]).join('');
console.log(`Part 2 solution: ${sol2}`); // QLFQDBBHM
