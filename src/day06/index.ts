import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split('');

const hasUniqueLetters = (array: string[]): boolean => {
  let flag = true;
  let buffer = "";
  for (let arrayIndex = 0; arrayIndex < array.length; arrayIndex++) {
    const element  = array[arrayIndex];
    if(buffer.includes(element)) flag = false;
    // else flag = true;
    buffer += element;
  }
  return flag;
}
const part1 = (rawInput: string) => {
  const buffer = parseInput(rawInput)
  let index = null;
  const partialBuffer: string[] = []
  for (let bufferIndex = 0; bufferIndex < buffer.length; bufferIndex++) {
    if(partialBuffer.length === 4) {
      partialBuffer.shift();
    }

    partialBuffer.push(buffer[bufferIndex]);
    if(partialBuffer.length === 4 && hasUniqueLetters(partialBuffer)) {
      index = bufferIndex;
      break;
    }
  }

  return index + 1;
}

const part2 = (rawInput: string) => {
  const buffer = parseInput(rawInput)
  let index = null;
  const partialBuffer: string[] = []
  for (let bufferIndex = 0; bufferIndex < buffer.length; bufferIndex++) {
    if(partialBuffer.length === 14) {
      partialBuffer.shift();
    }

    partialBuffer.push(buffer[bufferIndex]);
    if(partialBuffer.length === 14 && hasUniqueLetters(partialBuffer)) {
      index = bufferIndex;
      break;
    }
  }

  return index + 1;
}

run({
  part1: {
    tests: [
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 5,
      },
      {
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 6,
      }
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
