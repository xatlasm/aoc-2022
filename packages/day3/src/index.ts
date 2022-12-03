import * as fs from 'fs/promises';

// part 1
const input = await fs.readFile('src/input.txt', { encoding: 'utf8' });
const sacks = input.split('\n');

const vals = sacks
  .map((sack) => {
    const firstHalf = sack.slice(0, sack.length / 2).split('');
    const secondHalf = sack.slice(sack.length / 2).split('');
    const intersection = firstHalf.filter((char) => secondHalf.includes(char));
    return intersection[0] === intersection[0].toUpperCase()
      ? intersection[0].charCodeAt(0) - 38
      : intersection[0].charCodeAt(0) - 96;
  })
  .reduce((sum, val) => sum + val, 0);
console.log(`Part 1 solution: ${vals}`);

// part 2
const groups = [];
for (let i = 0; i < sacks.length; i += 3) {
  groups.push([sacks[i], sacks[i + 1], sacks[i + 2]].join('\n'));
}
const result = groups
  .map((group) => {
    const [firstSack, secondSack, thirdSack] = group.split('\n');
    const intersection = firstSack
      .split('')
      .filter(
        (char) =>
          secondSack.split('').includes(char) &&
          thirdSack.split('').includes(char)
      );
    return intersection[0] === intersection[0].toUpperCase()
      ? intersection[0].charCodeAt(0) - 38
      : intersection[0].charCodeAt(0) - 96;
  })
  .reduce((sum, val) => sum + val, 0);
console.log(`Part 2 solution: ${result}`);
