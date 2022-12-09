import * as fs from 'fs/promises';

type StraightMoves = {
  [key in 'L' | 'R' | 'U' | 'D']: [-1 | 0 | 1, -1 | 0 | 1];
};

type DiagMoves = [-1 | 1, -1 | 1][];

const straightMoves: StraightMoves = {
  L: [-1, 0],
  R: [1, 0],
  U: [0, 1],
  D: [0, -1],
};

const diagMoves: DiagMoves = [
  [1, 1],
  [1, 1],
  [1, 1],
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [-1, 1],
  [-1, 1],
  [-1, 1],
  [1, -1],
  [1, -1],
  [1, -1],
];

const straightMap = ['[-2,0]', '[2,0]', '[0,2]', '[0,-2]'];

// honestly, I don't fully understand why part 2 can have states where
// neighboring nodes can be as far as [2, 2] apart, but not part 1, but
// this is how it has to work for the code to not crash...
const diagMap = [
  '[1,2]',
  '[2,1]',
  '[2,2]',
  '[-2,-1]',
  '[-1,-2]',
  '[-2,-2]',
  '[-1,2]',
  '[-2,1]',
  '[-2,2]',
  '[2,-1]',
  '[1,-2]',
  '[2,-2]',
];

const input = await fs.readFile('src/input.txt', { encoding: 'utf8' });
const lines = input.split('\n');
const moveSequence = lines.flatMap((line) => {
  const [direction, times] = line.split(' ');
  const result = [];
  for (let i = 0; i < Number(times); i++) {
    result.push(straightMoves[direction as keyof StraightMoves]);
  }
  return result;
});

type Position = [number, number];
let h: Position = [0, 0];
let t: Position = [0, 0];
const positions: Position[] = [[0, 0]];

const calcDiff = (head: Position, tail: Position) => [
  head[0] - tail[0],
  head[1] - tail[1],
];

const calcMove = (head: Position, tail: Position) => {
  const diff = calcDiff(head, tail);
  if (Math.max(...diff.map((d) => Math.abs(d))) <= 1) return [0, 0];
  if (straightMap.includes(JSON.stringify(diff)))
    return Object.values(straightMoves)[
      straightMap.findIndex((m) => m === JSON.stringify(diff))
    ];
  return Object.values(diagMoves)[
    diagMap.findIndex((m) => m === JSON.stringify(diff))
  ];
};

const moveNode = (
  node: Position,
  move: ReturnType<typeof calcMove>
): Position => [node[0] + move[0], node[1] + move[1]];

moveSequence.forEach((move) => {
  h = moveNode(h, move);
  t = moveNode(t, calcMove(h, t));
  positions.push(t);
});

const result = new Set(positions.map((p) => JSON.stringify(p)));

console.log(`Part 1 solution: ${result.size}`);

let head: Position = [0, 0];
let mid1: Position = [0, 0];
let mid2: Position = [0, 0];
let mid3: Position = [0, 0];
let mid4: Position = [0, 0];
let mid5: Position = [0, 0];
let mid6: Position = [0, 0];
let mid7: Position = [0, 0];
let mid8: Position = [0, 0];
let tail: Position = [0, 0];

const positions2: Position[] = [[0, 0]];

moveSequence.forEach((move) => {
  head = moveNode(head, move);
  mid1 = moveNode(mid1, calcMove(head, mid1));
  mid2 = moveNode(mid2, calcMove(mid1, mid2));
  mid3 = moveNode(mid3, calcMove(mid2, mid3));
  mid4 = moveNode(mid4, calcMove(mid3, mid4));
  mid5 = moveNode(mid5, calcMove(mid4, mid5));
  mid6 = moveNode(mid6, calcMove(mid5, mid6));
  mid7 = moveNode(mid7, calcMove(mid6, mid7));
  mid8 = moveNode(mid8, calcMove(mid7, mid8));
  tail = moveNode(tail, calcMove(mid8, tail));
  positions2.push(tail);
});

const result2 = new Set(positions2.map((p) => JSON.stringify(p)));
console.log(`Part 2 solution: ${result2.size}`);
