import * as fs from 'fs/promises';

const input = await fs.readFile('src/input.txt', { encoding: 'utf8' });

const solution = (length: number) => {
  if (length > input.length) return -1;
  for (let p = length - 1; p < input.length; p++) {
    const buffer = input.slice(p - (length - 1), p + 1);
    if (new Set(buffer).size === buffer.length) return p + 1;
  }
  return -1;
};

console.log(`Part 1 solution: ${solution(4)}`);
console.log(`Part 2 solution: ${solution(14)}`);
