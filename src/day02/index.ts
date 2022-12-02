import run from "aocrunner"

const X = 1, Y = 2, Z = 3;
const winningConditions = ['A Y', 'B Z', 'C X'];
const draws = ['A X', 'B Y', 'C Z'];

const calculateHandPoint = (round: string): number => {
  if(round.includes('X')) return X;
  if(round.includes('Y')) return Y;
  return Z;
}

const calculateWin = (round: string): number => {
  if(winningConditions.includes(round)) return 6;
  if(draws.includes(round)) return 3;
  return 0;
}

const calculateRound = (round: string): number => {
  const handPoint = calculateHandPoint(round) 
  const win = calculateWin(round);
  return handPoint + win;
}

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
  const rounds = parseInput(rawInput);
  const total = rounds.reduce((acc, value, index) => {
    const res = calculateRound(value);
    return acc + res;
  }, 0);
  return total
}

const rules = [
  {opponentHand: 'A', win: 2, loss: 3, draw: 1},
  {opponentHand: 'B', win: 3, loss: 1, draw: 2},
  {opponentHand: 'C', win: 1, loss: 2, draw: 3}
];

const calculateHandPoint2 = (round: string, endRound: 'win' | 'draw' | 'loss') => {
  const opponentHand = round[0];
  // @ts-expect-error
  return rules.find(v => v.opponentHand === opponentHand)[endRound];
}

const win = (round: string) => round.includes('Z');
const draw = (round: string) => round.includes('Y');

const calculateRound2 = (round: string) => {
  if(win(round)) return 6 + calculateHandPoint2(round, 'win');
  if(draw(round)) return 3 + calculateHandPoint2(round, 'draw');
  return 0 + calculateHandPoint2(round, 'loss');
}

const part2 = (rawInput: string) => {
  const rounds = parseInput(rawInput)
  const total = rounds.reduce((acc, value, index) => {
    const res = calculateRound2(value);
    return acc + res;
  }, 0);
  return total;
}

run({
  part1: {
    tests: [
      {
        input: `A Y\nB X\nC Z`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `A Y\nB X\nC Z`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
