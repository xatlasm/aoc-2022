import * as fs from "fs/promises";

// part 1
const input = await fs.readFile("src/input.txt", { encoding: "utf8" });

const sums = input
  .split("\n\n")
  .map((group) => group.split("\n").map((str) => Number(str)))
  .map((group) => group.reduce((sum, val) => sum + val, 0));

const maxSum = Math.max(...sums);
console.log(`Part 1 solution: ${maxSum}`);

// part 2
const sortedSums = sums.sort((a, b) => b - a);
const topThreeSums = sortedSums.slice(0, 3);
const sumOfTopThreeSums = topThreeSums.reduce((res, sum) => res + sum, 0);
console.log(`Part 2 solution: ${sumOfTopThreeSums}`);
