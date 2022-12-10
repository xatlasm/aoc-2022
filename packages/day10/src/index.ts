import * as fs from 'fs/promises';

type Command = ['addx', number] | ['noop'];

// part 1
const input = await fs.readFile('src/input.txt', { encoding: 'utf8' });
const commands: Command[] = input
  .split('\n')
  .map(
    (line) =>
      line
        .split(' ')
        .map((part, i) => (i === 1 ? Number(part) : part)) as Command
  );

let x = 1; // register value
let i = 1; // cycle count
const signalStrengths: number[] = [];
const cycleRegisterTuple: [number, number][] = [];
commands.forEach((command) => {
  const [cmd, arg] = command;
  if (cmd === 'addx') {
    signalStrengths.push(i * x);
    cycleRegisterTuple.push([i, x]);
    i++;
    signalStrengths.push(i * x);
    cycleRegisterTuple.push([i, x]);
    x += arg;
  } else {
    signalStrengths.push(i * x);
    cycleRegisterTuple.push([i, x]);
  }
  i++;
});
const solution1 = signalStrengths
  .filter((_, i) => (i + 21) % 40 === 0)
  .reduce((sum, value) => sum + value, 0);

console.log(`Part 1 solution: ${solution1}`); // 11720

// part 2
const render = cycleRegisterTuple
  .map((tuple, i) => {
    const [, x] = tuple;
    return i % 40 >= x - 1 && i % 40 <= x + 1 ? '\u25A0' : ' ';
  })
  .map((char, i) => ((i + 1) % 40 === 0 ? `${char} \n` : `${char} `))
  .join('');

// ERCREPCJ
console.log(
  `%cPart 2 solution (look carefully!):

${render}`,
  `font-family: monospace`
);
