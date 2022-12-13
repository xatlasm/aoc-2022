import * as fs from 'fs/promises';

// part 1
const input = await fs.readFile('src/input.txt', { encoding: 'utf8' });
const pairs = input.split('\n\n').map((pair) => pair.split('\n'));

pairs.map((pair) => {
  const [left, right] = pair;
});
