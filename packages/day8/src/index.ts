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
  // edge cases
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

console.log(`Part 1 solution: ${visibleCount}`); // 1733

// Part 2
const sceneryScore = (y: number, x: number): number => {
  // edge cases
  if (x === 0 || x === grid[0].length - 1 || y === 0 || y === grid.length - 1)
    return 0;

  const height = grid[y][x];

  const calcDirScore = (arr: number[]) =>
    arr.reduce((count, tree, i, arr) => {
      if (tree >= height) arr.splice(1); // eject!
      return count + 1;
    }, 0);

  const rightScore = calcDirScore(grid[y].slice(x + 1));
  const leftScore = calcDirScore(grid[y].slice(0, x).reverse());
  const downScore = calcDirScore(transposedGrid[x].slice(y + 1));
  const upScore = calcDirScore(transposedGrid[x].slice(0, y).reverse());
  return rightScore * leftScore * downScore * upScore;
};

const maxScenery = Math.max(
  ...grid.flatMap((row, j) => row.map((tree, i) => sceneryScore(j, i)))
);

console.log(`Part 2 solution: ${maxScenery}`); // 284648
