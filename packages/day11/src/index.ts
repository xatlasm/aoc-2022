type Monkey = {
  items: number[];
  operation: (old: number) => number;
  test: (item: number) => number;
};

const inspect = (item: number, operation: (old: number) => number) =>
  // Math.floor(operation(item) / 3) // part 1
  operation(item) % 9699690; // part 2: product of the test modulos

const test = (item: number, test: (item: number) => number) => test(item);

const monkey0: Monkey = {
  items: [54, 53],
  operation: (old: number) => old * 3,
  test: (item: number) => (item % 2 === 0 ? 2 : 6),
};

const monkey1: Monkey = {
  items: [95, 88, 75, 81, 91, 67, 65, 84],
  operation: (old: number) => old * 11,
  test: (item: number) => (item % 7 === 0 ? 3 : 4),
};

const monkey2: Monkey = {
  items: [76, 81, 50, 93, 96, 81, 83],
  operation: (old: number) => old + 6,
  test: (item: number) => (item % 3 === 0 ? 5 : 1),
};

const monkey3: Monkey = {
  items: [83, 85, 85, 63],
  operation: (old: number) => old + 4,
  test: (item: number) => (item % 11 === 0 ? 7 : 4),
};

const monkey4: Monkey = {
  items: [85, 52, 64],
  operation: (old: number) => old + 8,
  test: (item: number) => (item % 17 === 0 ? 0 : 7),
};

const monkey5: Monkey = {
  items: [57],
  operation: (old: number) => old + 2,
  test: (item: number) => (item % 5 === 0 ? 1 : 3),
};

const monkey6: Monkey = {
  items: [60, 95, 76, 66, 91],
  operation: (old: number) => old * old,
  test: (item: number) => (item % 13 === 0 ? 2 : 5),
};

const monkey7: Monkey = {
  items: [65, 84, 76, 72, 79, 65],
  operation: (old: number) => old + 5,
  test: (item: number) => (item % 19 === 0 ? 6 : 0),
};

const monkeys: Monkey[] = [
  monkey0,
  monkey1,
  monkey2,
  monkey3,
  monkey4,
  monkey5,
  monkey6,
  monkey7,
];

const inspectionCount: number[] = Array(monkeys.length).fill(0);

const playRounds = (rounds: number) => {
  for (let i = 0; i < rounds; i++) {
    monkeys.forEach((monkey, j) => {
      const inspected = monkey.items.map((item) => {
        inspectionCount[j]++;
        return inspect(item, monkey.operation);
      }); // inspection
      inspected.forEach((item) => {
        const toMonkey = test(item, monkey.test);
        monkeys[toMonkey].items.push(item);
      });
      monkey.items = [];
    });
  }
};

// playRounds(20); // part 1
playRounds(10000); // part 2
const monkeyBusiness = inspectionCount
  .sort((a, b) => a - b)
  .slice(-2)
  .reduce((p, n) => p * n, 1);
console.log(`Solution: ${monkeyBusiness}`);
