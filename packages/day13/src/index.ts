import * as fs from 'fs/promises';

// part 1
const input = await fs.readFile('src/input.txt', { encoding: 'utf8' });
const pairs = input.split('\n\n').map((x) => x.split('\n'));
const indexes = pairs.map((pair, i) => {
  const [l, r] = pair;
  const left = JSON.parse(l);
  const right = JSON.parse(r);
  return compare(left, right) ? i + 1 : 0;
});
const sol = indexes.reduce((sum, i) => sum + i);
console.log(`Part 1 solution: ${sol}`);

function compare(left, right) {
  while (left.length && right.length) {
    const l = left.shift();
    const r = right.shift();

    if (typeof l === 'number' && typeof r === 'number') {
      if (l < r) return true;
      else if (l > r) return false;
    } else if (typeof l === 'object' && typeof r === 'object') {
      const res = compare(l, r);
      if (typeof res == 'boolean') return res;
    } else if (typeof l === 'number' && typeof r === 'object') {
      const res = compare([l], r);
      if (typeof res == 'boolean') return res;
    } else if (typeof l === 'object' && typeof r === 'number') {
      const res = compare(l, [r]);
      if (typeof res == 'boolean') return res;
    }
  }
  if (left.length) return false;
  if (right.length) return true;
}

// part 2

const packets = input
  .split('\n')
  .filter((x) => x.length)
  .map((x) => JSON.parse(x));

packets.push([[2]], [[6]]);

packets.sort((a, b) =>
  compare(structuredClone(a), structuredClone(b)) ? -1 : 1
);

const key1 = packets.findIndex((x) => x[0]?.[0] == 2) + 1;
const key2 = packets.findIndex((x) => x[0]?.[0] == 6) + 1;

console.log(`Part 2 solution: ${key1 * key2}`);
