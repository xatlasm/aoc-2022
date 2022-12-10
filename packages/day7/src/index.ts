import * as fs from 'fs/promises';

// part 1
const input = await fs.readFile('src/input.txt', { encoding: 'utf8' });
const lines = input.split('\n');

type Directory = {
  name: string;
  parent: Directory | null;
  children: Directory[];
  size: number;
};

const root: Directory = {
  name: '/',
  parent: null,
  children: [],
  size: 0,
};

const flatList: Directory[] = [root];
let currentDir = root;

lines.slice(1).forEach((line) => {
  if (line[0] === '$') {
    // command
    const [, cmd, arg] = line.split(' ');
    if (cmd === 'cd') {
      // don't care about ls itself
      if (arg !== '..') {
        currentDir =
          currentDir.children.find((dir) => dir.name === arg) ?? currentDir; // go down
      } else {
        currentDir = currentDir.parent ?? currentDir; // go up
      }
    }
  } else {
    // ls result (file or directory)
    const size = parseInt(line, 10);
    if (size > 0) {
      // file
      currentDir.size += size; // add size. Don't have to do it for flatList because it's an object ref!
      let parentDir = currentDir.parent;
      while (parentDir) {
        // recurse size up tree
        parentDir.size += size;
        parentDir = parentDir.parent;
      }
    } else {
      // dir
      const [, arg] = line.split(' ');
      const newDir = {
        name: arg,
        parent: currentDir,
        children: [],
        size: 0,
      };
      flatList.push(newDir);
      currentDir.children.push(newDir);
    }
  }
});

const smallFolders = flatList.filter((item) => item.size <= 100_000);
const smallFolderSizeSum = smallFolders.reduce(
  (sum, item) => sum + item.size,
  0
);

console.log(`Part 1 solution: ${smallFolderSizeSum}`); // 1908462

// part 2
const spaceToDelete = 30000000 - (70000000 - root.size);
const minSize = Math.min(
  ...flatList
    .filter((item) => item.size >= spaceToDelete)
    .map((item) => item.size)
);
console.log(`Part 2 solution: ${minSize}`); // 3979145
