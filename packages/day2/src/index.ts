import * as fs from "fs/promises";

// part 1
const opponentMoveValues = {
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors
};

const myMoveValues = {
  X: 1, // rock
  Y: 2, // paper
  Z: 3, // scissors
};

const outcomeValues = {
  A: {
    X: 3,
    Y: 6,
    Z: 0,
  },
  B: {
    X: 0,
    Y: 3,
    Z: 6,
  },
  C: {
    X: 6,
    Y: 0,
    Z: 3,
  },
};

const input = await fs.readFile("src/input.txt", { encoding: "utf8" });
const matches = input.split("\n").map((match) => match.split(" ")) as [
  keyof typeof opponentMoveValues,
  keyof typeof myMoveValues
][];
const totalScore = matches
  .map((match) => myMoveValues[match[1]] + outcomeValues[match[0]][match[1]])
  .reduce((total, score) => total + score, 0);
console.log(`Part 1 solution: ${totalScore}`);

// part 2
const outComeValues2 = {
  X: 0, // lose
  Y: 3, // draw
  Z: 6, // win
};

const myMoveValues2 = {
  A: {
    X: 3,
    Y: 1,
    Z: 2,
  },
  B: {
    X: 1,
    Y: 2,
    Z: 3,
  },
  C: {
    X: 2,
    Y: 3,
    Z: 1,
  },
};

const totalScore2 = matches
  .map((match) => outComeValues2[match[1]] + myMoveValues2[match[0]][match[1]])
  .reduce((total, score) => total + score, 0);
console.log(`Part 2 solution: ${totalScore2}`);
