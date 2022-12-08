import * as fs from 'fs/promises';

// Part 1
const input = await fs.readFile('src/input.txt', { encoding: 'utf8' });
const grid = input
  .split('\n')
  .map((line) => line.split('').map((s) => Number(s)));

const transposedGrid = grid[0].map((_, colIndex) =>
  grid.map((row) => row[colIndex])
);

const isVisible = (y: number, x: number): boolean => {
  // edges
  if (x === 0 || x === grid[0].length - 1 || y === 0 || y === grid.length - 1)
    return true;
  const height = grid[y][x];
  if (
    height > Math.max(...grid[y].slice(x + 1)) || // right
    height > Math.max(...grid[y].slice(0, x)) || // left
    height > Math.max(...transposedGrid[x].slice(y + 1)) || // down
    height > Math.max(...transposedGrid[x].slice(0, y)) // up
  )
    return true;
  return false;
};

const visibleCount = grid
  .map((row, j) => row.filter((tree, i) => isVisible(j, i)).length)
  .reduce((sum, count) => sum + count, 0);

console.log(`Part 1 solution: ${visibleCount}`);

// Part 2
const sceneryScore = (y: number, x: number): number => {
  // edges
  if (x === 0 || x === grid[0].length - 1 || y === 0 || y === grid.length - 1)
    return 0;

  const height = grid[y][x];

  // right
  const viewRight = grid[y].slice(x + 1).reduce((count, tree, i, arr) => {
    if (tree >= height) arr.splice(1); // eject!
    return count + 1;
  }, 0);

  // left
  const viewLeft = grid[y]
    .slice(0, x)
    .reverse()
    .reduce((count, tree, i, arr) => {
      if (tree >= height) arr.splice(1); // eject!
      return count + 1;
    }, 0);

  // down
  const viewDown = transposedGrid[x]
    .slice(y + 1)
    .reduce((count, tree, i, arr) => {
      if (tree >= height) arr.splice(1); //eject!
      return count + 1;
    }, 0);

  // up
  const viewup = transposedGrid[x]
    .slice(0, y)
    .reverse()
    .reduce((count, tree, i, arr) => {
      if (tree >= height) arr.splice(1); //eject!
      return count + 1;
    }, 0);

  return viewRight * viewLeft * viewDown * viewup;
};

const maxScenery = Math.max(
  ...grid.flatMap((row, j) => row.map((tree, i) => sceneryScore(j, i)))
);

console.log(`Part 2 solution: ${maxScenery}`);
