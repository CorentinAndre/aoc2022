import run from "aocrunner"

type Letter = string;

type RawRucksack = string;

type Rucksack = [string, string];

const letterToWeight = (letter: Letter): number => {
  if(letter.match(/[A-Z]/g)) {
    return letter.charCodeAt(0) - 38; 
  }
  return letter.charCodeAt(0) - 96;
};

const splitRucksacks = (rawRucksack: string): Rucksack => {
  return [rawRucksack.slice(0, rawRucksack.length / 2), rawRucksack.slice(rawRucksack.length / 2)];
}

const findItemToRearrange = ([first, second]: Rucksack): Letter=> {
  let letterToRearrange = null;
  for (let index = 0; index < first.length; index++) {
    let currentLetter = first.charAt(index);
    if(second.includes(currentLetter)) {
      letterToRearrange = currentLetter
      break;
    }
  }
  if(letterToRearrange) return letterToRearrange;
  for (let index = 0; index < second.length; index++) {
    let currentLetter = second.charAt(index);
    if(first.includes(currentLetter)) {
      letterToRearrange = currentLetter
      break;
    }
  }
  if(!letterToRearrange) {
    console.error({data: [first, second]});
    throw new Error('No letter for rucksack')
  };
  return letterToRearrange;
}

const parseInput = (rawInput: string): RawRucksack[] => rawInput.split('\n');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).map(splitRucksacks);
  const letters = input.map(findItemToRearrange);
  console.log(letters);
  return letters.map(letterToWeight).reduce((acc, v) => v+acc, 0);
}

const findCommonLetterOfAGroup = ([first, second, third]: [string, string, string]): string => {
  const splittedLetters = first.split('');
  let letter = null;
  for (let index = 0; index < splittedLetters.length; index++) {
    const element = splittedLetters[index];
    if(second.includes(element) && third.includes(element)) {
      letter = element;
      break;
    }
  }
  if(!letter) {
    console.error({first, second, third});
    throw new Error('Error when finding common letter');
  }
  return letter;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let groups = [];
  const numberOfGroups = input.length / 3;
  for (let index = 0; index < numberOfGroups; index++) {
    const indice = index * 3;
    groups.push(input.slice(indice, indice + 3));
  }
  
  return (groups as [string, string, string][]).map(group => letterToWeight(findCommonLetterOfAGroup(group))).reduce((acc, prev) => acc + prev, 0);
}

run({
  part1: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp\njqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\nPmmdzqPrVvPwwTWBwg\nwMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\nttgJtRGJQctTZtZT\nCrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp\njqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\nPmmdzqPrVvPwwTWBwg\nwMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\nttgJtRGJQctTZtZT\nCrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})

'1123456'