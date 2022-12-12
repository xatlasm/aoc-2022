import * as fs from 'fs/promises';
const input = await fs.readFile('src/input.txt', 'utf8');

type Move = [0 | 1 | -1, 0 | 1 | -1];
type MovesMap = {
  [key in 'L' | 'R' | 'U' | 'D']: Move;
};
const moves: MovesMap = {
  L: [-1, 0],
  R: [1, 0],
  U: [0, 1],
  D: [0, -1],
};

const parseInput = (part: number) => {
  const starts: [number, number][] = [];
  const end: [number, number][] = [[0, 0]];
  const heightMap = input.split('\n').map((line, row) =>
    line.split('').map((char, col) => {
      if (char === 'S' || (part === 2 && char === 'a')) {
        starts.push([row, col]);
        return 0;
      }
      if (char === 'E') {
        end.pop();
        end.push([row, col]);
        return 25;
      }
      return char.charCodeAt(0) - 97; // 97 = 'a'
    })
  );
  return { heightMap, starts, end: end.flat() };
};

type QueueItem = { pos: [number, number]; steps: number };
type Queue = QueueItem[];

function solve(part: number) {
  // converts input to elevation
  const { heightMap, starts, end } = parseInput(part);
  const queue: Queue = starts.map((start) => ({ pos: start, steps: 0 })); // keep track of places (pos) and total steps until that point (steps)
  const seen: [number, number][] = [];
  while (queue.length > 0) {
    const {
      pos: [row, col],
      steps,
    } = queue.shift() as QueueItem;
    // don't backtrack
    if (seen[row]?.[col]) {
      continue;
    }
    // win condition
    if (row === end[0] && col === end[1]) {
      console.log(`Part ${part} solution: ${steps}`);
      break;
    }
    // try all directions from current pos
    for (const move of Object.values(moves)) {
      // don't go oob, unallowed direction, or backtrack
      if (
        heightMap[row + move[0]]?.[col + move[1]] === undefined ||
        heightMap[row + move[0]][col + move[1]] > heightMap[row][col] + 1 ||
        seen[row + move[0]]?.[col + move[1]]
      ) {
        continue;
      }
      // try all valid moves next step
      queue.push({ pos: [row + move[0], col + move[1]], steps: steps + 1 });
    }
    // update where we've been
    seen[row] = seen[row] ?? [];
    seen[row][col] = 1;
  }
}
solve(1);
solve(2);
