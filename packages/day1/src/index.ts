import * as fs from 'fs/promises';

// part 1
const input = await fs.readFile('src/input.txt', { encoding: 'utf8' });
const sums = input
  .split('\n\n')
  .map((group) => group.split('\n').reduce((sum, val) => sum + Number(val), 0));
const maxSum = Math.max(...sums);
console.log(`Part 1 solution: ${maxSum}`); // 69795

// part 2
const sortedSums = sums.sort((a, b) => b - a);
const sumOfTopThreeSums = sortedSums
  .slice(0, 3)
  .reduce((res, sum) => res + sum, 0);
console.log(`Part 2 solution: ${sumOfTopThreeSums}`); // 208437
