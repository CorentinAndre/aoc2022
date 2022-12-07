import run from "aocrunner"
import { writeFileSync } from "fs";

const parseInput = (rawInput: string) => rawInput.split('\n');

const isCommand = (command: string) => command.startsWith('$');
const isChangeDirectory = (command: string) => command.startsWith('$ cd');

type ID = number;

type FileNode = {
  type: "file",
  size: number;
  parent: ID;
  name: string;
}

type DirNode = {
  id: ID;
  type: 'dir',
  name: string,
  parent: ID,
  size: number | undefined,
}

type Node = DirNode | FileNode;

let nodes: Node[] = [];

const createDirNode = (name: string, parent: ID): ID | undefined => {
  const dir = nodes.find(v => v.name === name && v.parent === parent)
  if(!dir) {
    let newId = nodes.length;
    // directory does not exists.
    nodes.push({
      id: newId,
      type: 'dir',
      name,
      parent,
      size: undefined,
    })
    return newId;
  }
  if(dir.type === 'dir') return dir.id;
  throw new Error('should not happen')
}

const createFileNode = (name: string, parent: ID, size: number) => {
  if(nodes.findIndex(v => v.name === name && v.parent === parent) < 0) {
    nodes.push({
      type: 'file',
      name,
      parent: parent,
      size,
    })
  }
}

let currentDir: ID | undefined = undefined;

const getDirectorySize = (id: ID) => {
  let size = 0;
  const children = nodes.filter(node => node.parent === id).forEach(node => {
    if(node.type === 'file') size+=node.size;
    else size+=getDirectorySize(node.id);
  })
  return size;
}

const part1 = (rawInput: string) => {
  const commands = parseInput(rawInput)
  for (let index = 0; index < commands.length; index++) {
    const cmd = commands[index];
    if(isCommand(cmd)) {
      // case cd
      if(isChangeDirectory(cmd)) {
        const [_, dir] = cmd.split(' cd ');
        if(dir === '..') {
          // find parent directory and current = parent. It must exists
          currentDir = nodes[currentDir].parent || 0;
        }
        else {
          // we cd in directory
          currentDir = createDirNode(dir, currentDir);
          // set currentDir to new value
        }
      } else {
        // case ls, we don't care here
      }
    } else {
      // it's not a command, so it's listing files
      const [sizeOrDir, fileOrDirName] = cmd.split(" ");
      if(sizeOrDir === "dir") {
        createDirNode(fileOrDirName, currentDir);
      }else {
        createFileNode(fileOrDirName, currentDir, parseInt(sizeOrDir, 10));
      }
    }
  }
  let res = 0;
  nodes.forEach(n => {
    if (n.type == 'dir') {
        let size = getDirectorySize(n.id);
        if (size < 100000) res += size;
        nodes[n.id].size = size;
    }
  })
  console.log(res);
  return res;
}

const part2 = (rawInput: string) => {
  const spaceLeft = 70_000_000 - nodes[0].size;
  const spaceNeeded = 30_000_000;
  const spaceToDelete = Math.abs(spaceLeft - spaceNeeded);
  const sortedDirs = nodes.filter(n => n.type === 'dir').sort((a, b) => a.size - b.size);
  while(sortedDirs[0].size < spaceToDelete) sortedDirs.shift();
  return sortedDirs[0].size
}

run({
  part1: {
    tests: [
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
