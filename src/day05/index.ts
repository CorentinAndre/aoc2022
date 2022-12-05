import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split('\n\n');

type Stack = string[];

type Ship = Stack[];

// column every 5th char
const STACK_BEGINNING_FACTOR = 4;

const STACK_COUNT = 9;
const BEGINNING_STACK_HEIGHT = 8;

const parseDrawing = (drawing: string): Ship => {
  const ship = [];
  const splittedDrawingByLine = drawing.split('\n');
  // remove last line count
  splittedDrawingByLine.pop();

  for (let stackIndex = 0; stackIndex < STACK_COUNT; stackIndex++) {
    let stack = [];
    for (let crateIndex = 0; crateIndex < BEGINNING_STACK_HEIGHT; crateIndex++) {
      const indice = stackIndex * STACK_BEGINNING_FACTOR;
      if(splittedDrawingByLine[crateIndex][indice] === '[') {
        stack.push(splittedDrawingByLine[crateIndex][indice+1]);
      }
    }
    ship.push(stack)
  }
  return ship;
}

type Instruction = {
  cratesToMove: number,
  from: number,
  to: number,
}

const parseInstructions = (instructions: string): Instruction[] => {
  return instructions.split('\n').map(v => v.split(' from ')).map(([rawStackCount, fromTo]) => {
    const [from, to] = fromTo.split(' to ').map(v => parseInt(v, 10));
    return {
      cratesToMove: parseInt(rawStackCount.split(' ')[1], 10),
      from,
      to,
    };
  })
}

const executeInstruction = (ship: Ship, {from, to, cratesToMove}: Instruction): Ship => {
  const newShip = [...ship];
  // console.log({newShip})
  for (let index = 0; index < cratesToMove; index++) {
    const crateMoved = newShip[from - 1].shift();
    if(crateMoved) {
      newShip[to - 1].unshift(crateMoved);
    }
  }
  
  return newShip;
}

const part1 = (rawInput: string) => {
  const [drawing, rawInstructions] = parseInput(rawInput)
  let ship = parseDrawing(drawing);
  const instructions = parseInstructions(rawInstructions);
  instructions.forEach(instruction => {
    ship = executeInstruction(ship, instruction);
  })

  return ship.map(stack => stack[0]).join('');

  return
}

const executeInstruction3001 = (ship: Ship, {from, to, cratesToMove}: Instruction): Ship => {
  const newShip = [...ship];
  // console.log({newShip})
  const cratesToMoveFromAStack = newShip[from - 1].slice(0, cratesToMove);
  const cratesLeft = newShip[from - 1].slice(cratesToMove);
  newShip[from - 1] = cratesLeft;

  newShip[to - 1].unshift(...cratesToMoveFromAStack);
  
  return newShip;
}

const part2 = (rawInput: string) => {
  const [drawing, rawInstructions] = parseInput(rawInput)
  let ship = parseDrawing(drawing);
  const instructions = parseInstructions(rawInstructions);
  instructions.forEach(instruction => {
    ship = executeInstruction3001(ship, instruction);
  })

  return ship.map(stack => stack[0]).join('');
}

run({
  part1: {
    tests: [
      // {
      //   input: `    [D]    \n[N] [C]    \n[Z] [M] [P]\n1   2   3\n\nmove 1 from 2 to 1\nmove 3 from 1 to 3\nmove 2 from 2 to 1\nmove 1 from 1 to 2`,
      //   expected: "CMZ",
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
