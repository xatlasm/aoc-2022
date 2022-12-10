import * as fs from 'fs/promises';

type Move = [0 | 1 | -1, 0 | 1 | -1];
type Position = [number, number];
type Moves = Move[];
type Positions = Position[];
type StraightMovesMap = {
  [key in 'L' | 'R' | 'U' | 'D']: Move;
};
const straightMovesMap: StraightMovesMap = {
  L: [-1, 0],
  R: [1, 0],
  U: [0, 1],
  D: [0, -1],
};

const moveMap: Record<string, Move> = {
  '[-2,0]': [-1, 0],
  '[2,0]': [1, 0],
  '[0,2]': [0, 1],
  '[0,-2]': [0, -1],
  '[1,2]': [1, 1],
  '[2,1]': [1, 1],
  '[2,2]': [1, 1],
  '[-2,-1]': [-1, -1],
  '[-1,-2]': [-1, -1],
  '[-2,-2]': [-1, -1],
  '[-1,2]': [-1, 1],
  '[-2,1]': [-1, 1],
  '[-2,2]': [-1, 1],
  '[2,-1]': [1, -1],
  '[1,-2]': [1, -1],
  '[2,-2]': [1, -1],
};

const createNodes = (length: number) => {
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push([0, 0] as Position);
  }
  return result;
};

const calcMove = (head: Position, tail: Position): Move => {
  const diff = [head[0] - tail[0], head[1] - tail[1]];
  if (Math.max(...diff.map((d) => Math.abs(d))) <= 1) return [0, 0];
  const diffString = JSON.stringify(diff);
  return moveMap[diffString];
};

const moveNode = (node: Position, move: Move): Position => [
  node[0] + move[0],
  node[1] + move[1],
];

const simulate = (nodesArr: Positions, moves: Moves) => {
  const nodes = [...nodesArr]; // protect initial array
  const tailTrace = [nodesArr.slice(-1).flat()];
  moves.forEach((move) => {
    for (let i = 0; i < nodes.length; i++) {
      nodes[i] =
        i === 0
          ? moveNode(nodes[0], move)
          : moveNode(nodes[i], calcMove(nodes[i - 1], nodes[i]));
    }
    tailTrace.push(nodes.slice(-1).flat());
  });
  return new Set(tailTrace.map((p) => JSON.stringify(p))).size;
};

// process input
const input = await fs.readFile('src/input.txt', { encoding: 'utf8' });
const moves = input.split('\n').flatMap((line) => {
  const [direction, times] = line.split(' ');
  const result = [];
  for (let i = 0; i < Number(times); i++) {
    result.push(straightMovesMap[direction as keyof StraightMovesMap]);
  }
  return result;
});

// part 1
const nodes = createNodes(2);
console.log(`Part 1 solution: ${simulate(nodes, moves)}`);

// part 2
const nodes2 = createNodes(10);
console.log(`Part 2 solution: ${simulate(nodes2, moves)}`);
