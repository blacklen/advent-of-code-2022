import { input7 as input } from '../input.js';

const fileSystem = {
  root: {
    files: [],
  },
};
const cursor = [];
let currentNode = null;

input.split('\n').map(c => {
  const [command, code, name] = c.split(' ');

  if (command === '$') {
    if (code === 'cd') {
      switch (name) {
        case '/': {
          cursor.push('root');
          currentNode = fileSystem.root;
          break;
        }
        case '..': {
          cursor.pop();
          currentNode = cursor.reduce((curr, node) => curr[node], fileSystem);
          break;
        }
        default: {
          cursor.push(name);
          currentNode = currentNode[name];
          break;
        }
      }
    }
  } else if (command === 'dir') {
    currentNode[code] = { files: [] };
  } else {
    currentNode.files.push(command);
  }
});

// total size at most 100000
let ans1 = 0;
let totalSizes = [];

const getTotalSize = (node) => {
  const totalSize = Object.entries(node).reduce((sum, [key, val]) => {
    sum += key === 'files' ? val.reduce((a, b) => +a + +b, 0) : getTotalSize(val);

    return sum;
  }, 0);

  if (totalSize <= 100000) ans += totalSize;
  totalSizes.push(totalSize);
  return totalSize;
}

const totalSize = getTotalSize(fileSystem.root);
const unusedSpace = 70000000 - totalSize;
const neededSpace = 30000000 - unusedSpace;
const ans2 = totalSizes.reduce((max, cur) => {
  if (cur < max && cur >= neededSpace) max = cur;
  return max;
}, totalSize + 1);

console.log('Answer', ans1, ans2);
