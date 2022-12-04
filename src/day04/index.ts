import run from "aocrunner"

type ElveRange = [number, number];

const parseInput = (rawInput: string): [ElveRange, ElveRange][] => rawInput.split('\n').map((v) => v.split(',')).map((v) => v.map(v => v.split('-').map(v => parseInt(v, 10)))) as [ElveRange, ElveRange][];

const hasPairFullyOverlappingAssignment = ([first, second]: [ElveRange,ElveRange]): boolean => {
  if(first[0]>= second[0] && first[1] <=second [1]) {
    return true;
  }else if(second[0]>= first[0] && second[1] <=first [1]) {
    return true;
  }
  return false;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let counter = 0;
  input.forEach(pair => {
    if(hasPairFullyOverlappingAssignment(pair)) {
      counter++;
    }
  })
  return counter;
}

const elveRangeToArray = ([beginning, end]: ElveRange): number[] => {
  return new Array(end - beginning + 1).fill(null).map((v, index) => index+beginning);
}

const hasPairPartiallyOverlappingAssignment = ([first, second]: [ElveRange,ElveRange]): boolean => {
  const firstArray = elveRangeToArray(first);
  const secondArray = elveRangeToArray(second);
  // console.log([first, second], [firstArray, secondArray])
  return firstArray.some(v => secondArray.includes(v)) || secondArray.some(v => first.includes(v));
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let counter = 0;
  input.forEach(pair => {
    if(hasPairPartiallyOverlappingAssignment(pair)) {
      counter++;
    }
  })
  return counter;
}

run({
  part1: {
    tests: [
      {
        input: `2-4,6-8\n2-3,4-5\n5-7,7-9\n2-8,3-7\n6-6,4-6\n2-6,4-8`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2-4,6-8\n2-3,4-5\n5-7,7-9\n2-8,3-7\n6-6,4-6\n2-6,4-8`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
