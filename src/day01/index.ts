import run from "aocrunner"

const parseInput = (rawInput: string): string[] => rawInput.split('\n\n');

const countCalories = (elve: string) => {
  const itemsCalories = elve.split('\n').map(v => parseInt(v, 10));
  return itemsCalories.reduce((acc, prev) => acc + prev);
}

const maxCalories = (elves: string[]) => {
  let max = 0;
  for (let index = 0; index < elves.length; index++) {
    const currentCal = countCalories(elves[index]);
    if(currentCal > max) max = currentCal;
  }
  return max;
}

const part1 = (rawInput: string) => {
  const elvesCalories = parseInput(rawInput)
  const max = maxCalories(elvesCalories);

  return max;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const elvesCalories = input.map(countCalories);
  elvesCalories.sort((a, b) => b - a);
  return elvesCalories[0] + elvesCalories[1] + elvesCalories[2];
}

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
