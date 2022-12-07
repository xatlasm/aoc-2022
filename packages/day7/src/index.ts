import * as fs from 'fs/promises';

// part 1
const input = await fs.readFile('src/input.txt', { encoding: 'utf8' });
const lines = input.split('\n');

const cdRe = /\$ cd (.+)/;
const sizeRe = /(\d+)/;

const dirs: Record<string, number> = {};
const path: string[] = [];
lines.forEach((line) => {
  if (line === '$ cd ..') path.pop();
  else if (cdRe.exec(line)) path.push(cdRe.exec(line)?.[1] ?? '');
  else if (sizeRe.exec(line)) {
    dirs[path.join('/')] =
      dirs[path.join('/')] ?? 0 + Number(sizeRe.exec(line)?.[1]);
  }
});

console.log(dirs);

// part1
const sol1 = Object.values(dirs)
  .filter((size) => size <= 100000)
  .reduce((sum, size) => sum + size, 0);
console.log(sol1);

// const commands = lines
//   .map((line, index): [number, string[]] => [index, line.split(' ')])
//   .filter((line) => line[1][0] === '$')
//   .flatMap((cmd) => [
//     { index: cmd[0], cmd: cmd[1].slice(1)[0], arg: cmd[1].slice(1)[1] },
//   ]);
// console.log(commands);
