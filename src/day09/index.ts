import run from "aocrunner"
import { reverse } from "dns";

type Direction = 'R' | 'U' | 'L' | 'D';

type Instruction = {
  direction: Direction;
  distance: number;
}

type Coordinates = {
  x: number;
  y: number;
}

type LiteralCoordinates = `${number},${number}`;

const parseInput = (rawInput: string): Instruction[] => rawInput.split('\n').map(v => {
  const [direction, distance] = v.split(' ');
  return {direction: direction as Direction, distance: parseInt(distance, 10)};
})


const coordinatesToString = (c: Coordinates): LiteralCoordinates => `${c.x},${c.y}`;

const move = (
  head: Coordinates,
  tail: Coordinates,
): Coordinates => {
  const dx: number = head.x - tail.x
  const dy: number = head.y - tail.y
  const xDist: number = Math.max(Math.abs(dx), 1)
  const yDist: number = Math.max(Math.abs(dy), 1)
  // should not move if dist is less or equal to 1
  if(xDist < 2 && yDist < 2) {
    return tail;
  }
  return {
    x: tail.x + dx / xDist,
    y: tail.y + dy / yDist,
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const pastTailCoordinates: Set<LiteralCoordinates> = new Set();
  let tailCoordinates: Coordinates = {x: 0, y: 0}, headCoordinates: Coordinates = {x: 0, y: 0};
  // add initial coordinates
  pastTailCoordinates.add(coordinatesToString(tailCoordinates));
  input.forEach(({direction, distance}) => {
    for (let index = 0; index < distance; index++) {
      if(direction === 'D') {
        // y - 1
        headCoordinates.y -= 1;
      } else if(direction === 'L') {
        headCoordinates.x -= 1;
      } else if(direction === 'R') {
        headCoordinates.x += 1;
      } else if(direction === 'U') {
        headCoordinates.y += 1;
      }
      // calculate tail moves
      // if abs(head - tail <= 1) for x & y => no move
      // if(Math.abs(headCoordinates.x - tailCoordinates.x) <= 1 && Math.abs(headCoordinates.y - tailCoordinates.y) <= 1) {
      //   // does not move
      // } else {
      //   if(direction === 'D') {
      //     tailCoordinates.y -= 1;
      //   } else if(direction === 'L') {
      //     tailCoordinates.x -= 1;
      //   } else if(direction === 'R') {
      //     tailCoordinates.x += 1;
      //   } else if(direction === 'U') {
      //     tailCoordinates.y += 1;
      //   }
      //   // handle diagonals
      //   if((direction === 'U' || direction === 'D') && tailCoordinates.x !== headCoordinates.x) {
      //     tailCoordinates.x = headCoordinates.x;
      //   } else if((direction === 'R' || direction === 'L') && tailCoordinates.y !== headCoordinates.y) {
      //     tailCoordinates.y = headCoordinates.y;
      //   }
      // }
      tailCoordinates = move(headCoordinates, tailCoordinates);

      pastTailCoordinates.add(coordinatesToString(tailCoordinates));
    }
  })
  return pastTailCoordinates.size;
}

const ROPE_LENGTH = 10;

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const pastTailCoordinates: Set<LiteralCoordinates> = new Set();
  const knots: Coordinates[] = Array.from<Coordinates>({length: ROPE_LENGTH}).map(v => ({x: 0, y: 0}));
  const addToSet = () => {
    pastTailCoordinates.add(coordinatesToString(knots[knots.length - 1]));
  }
  addToSet();
  input.forEach(({direction, distance}, index) => {
    for (let index = 0; index < distance; index++) {
      // first move head
      if(direction === 'D') {
        knots[0].y -= 1;
      } else if(direction === 'L') {
        knots[0].x -= 1;
      } else if(direction === 'R') {
        knots[0].x += 1;
      } else if(direction === 'U') {
        knots[0].y += 1;
      }
      // then calculates each knot move based on the previous knot
      for (let knotIndex = 1; knotIndex < knots.length; knotIndex++) {
        let previousKnot = knots[knotIndex - 1];
        knots[knotIndex] = move(previousKnot, knots[knotIndex]);
      }
      addToSet();
    }
  })
  return pastTailCoordinates.size;
}

run({
  part1: {
    tests: [
      {
        input: `R 4\nU 4\nL 3\nD 1\nR 4\nD 1\nL 5\nR 2`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: `R 4\nU 4\nL 3\nD 1\nR 4\nD 1\nL 5\nR 2`,
      //   expected: 1,
      // },
      {
        input: `R 5\nU 8\nL 8\nD 3\nR 17\nD 10\nL 25\nU 20`,
        expected: 36
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
