import run from "aocrunner"
import { writeFileSync } from "fs";

type TreeGrid  = TreeHeight[][];

type TreeCoordinates = {
  x: number,
  y: number,
}

const parseInput = (rawInput: string): TreeGrid => rawInput.split('\n').map(line => line.split('').map(Number));

const isOnTheEdge = (c: TreeCoordinates, g: TreeGrid): boolean => {
  if(c.x === 0 || c.y === 0) return true;
  if(c.x === g[0].length - 1 || c.y === g.length - 1) return true;
  return false;
}


const isTreeVisible = (c: TreeCoordinates, g: TreeGrid): boolean => {
  if(isOnTheEdge(c, g)) return true;

  // calculates the trees front
  const {x, y} = c;
  const currentTreeHeight = g[y][x];
  

  // left
  const leftTrees = g[y].slice(0, x);
  if(leftTrees.every(tree => tree < currentTreeHeight)) return true;

  // top
  const topTrees = g.slice(0, y).map(v => v[x]);
  if(topTrees.every(tree => tree < currentTreeHeight)) return true;

  // right
  const rightTrees = g[y].slice(x+1);
  if(rightTrees.every(tree => tree < currentTreeHeight)) return true;

  // bottom
  const bottomTrees = g.slice(y+1).map(v => v[x]);
  if(bottomTrees.every(tree => tree < currentTreeHeight)) return true;
  
  return false;
}

type TreeHeight = number;


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let counter = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if(isTreeVisible({x, y}, input)) counter ++
    }
    
  }
  return counter
}

/*
30373
25512
65332
33549
35390
*/

function getVisibilityScore({ x, y }: TreeCoordinates, g: TreeGrid): number {
  // looking left
  const leftTrees = g[y].slice(0, x);
  let currentLeftHeight = g[y][x];
  let leftCount = 0;
  leftTrees.reverse();
  for (let leftIndex = 0; leftIndex < leftTrees.length; leftIndex++) {
    const element = leftTrees[leftIndex];
    leftCount ++;
    if(element >= currentLeftHeight) break;
    // currentLeftHeight = element;
  }

  const topTrees = g.slice(0, y).map(v => v[x]);
  let currentTopHeight = g[y][x];
  let topCount = 0;
  topTrees.reverse();
  for (let topIndex = 0; topIndex < topTrees.length; topIndex++) {
    const element = topTrees[topIndex];
    topCount ++;
    if(element >= currentTopHeight) break;
    // currentTopHeight = element;
  }

  const rightTrees = g[y].slice(x + 1);
  let currentRightHeight = g[y][x];
  let rightCount = 0;
  for (let rightIndex = 0; rightIndex < rightTrees.length; rightIndex++) {
    const element = rightTrees[rightIndex];
    rightCount ++;
    if(element >= currentRightHeight) break;
    // currentRightHeight = element;
  }

  const bottomTrees = g.slice(y + 1).map(v => v[x]);
  let currentBottomHeight = g[y][x];
  let bottomCount = 0;
  for (let bottomIndex = 0; bottomIndex < bottomTrees.length; bottomIndex++) {
    const element = bottomTrees[bottomIndex];
    bottomCount ++;
    if(element >= currentBottomHeight) break;
  }

  return topCount * rightCount * bottomCount * leftCount;
}


const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let highestScore = 0;
  input.forEach((_, y) => {
    let l = "";
    input[y].forEach((_2, x) => {
      const score = getVisibilityScore({x, y}, input);
      l = l.concat(score.toString().padEnd(5, "   "));
      if(score > highestScore) highestScore = score;
    })
  })
  return highestScore;
}

run({
  part1: {
    tests: [
      {
        input: `30373\n25512\n65332\n33549\n35390`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `30373\n25512\n65332\n33549\n35390`,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
