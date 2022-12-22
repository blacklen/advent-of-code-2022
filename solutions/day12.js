import { input12 as input } from '../input.js';

const mapVal = input.split('\n').map(i => i.split('').map(c => c.charCodeAt()));
const ROW = mapVal.length;
const COL = mapVal[0].length;
const visited = Array.from({ length: ROW }, () => Array(COL).fill(0));

const endValue = 'E'.charCodeAt();
const startValue = 'S'.charCodeAt();

const findNode = (value) => {
  const r = mapVal.findIndex(i => i.includes(value));
  const c = mapVal[r].findIndex(i => i === value);

  return [r, c];
}

const [startR, startC] = findNode(startValue);
const [endR, endC] = findNode(endValue);

mapVal[startR][startC] = 'a'.charCodeAt();
mapVal[endR][endC] = 'z'.charCodeAt();

const getUp = (r, c) => {
  const neighbors = [];
  const value = mapVal[r][c];

  // up
  if (r - 1 >= 0 && mapVal[r - 1][c] > value) {
    neighbors.push({ r: r - 1, c });
  }

  // down
  if (r + 1 < ROW && mapVal[r + 1][c] > value) {
    neighbors.push({ r: r + 1, c });
  }

  // right
  if (c + 1 < COL && mapVal[r][c + 1] > value) {
    neighbors.push({ r, c: c + 1 });
  }

  // left
  if (c - 1 >= 0 && mapVal[r][c - 1] > value) {
    neighbors.push({ r, c: c - 1 });
  }

  return neighbors;
}

const getNeighbors = (r, c) => {
  const neighbors = [];
  const value = mapVal[r][c];

  // up
  if (r - 1 >= 0 && [value, value - 1].includes(mapVal[r - 1][c])) {
    neighbors.push({ r: r - 1, c });
  }

  // down
  if (r + 1 < ROW && [value, value - 1].includes(mapVal[r + 1][c])) {
    neighbors.push({ r: r + 1, c });
  }

  // right
  if (c + 1 < COL && [value, value - 1].includes(mapVal[r][c + 1])) {
    neighbors.push({ r, c: c + 1 });
  }

  // left
  if (c - 1 >= 0 && [value, value - 1].includes(mapVal[r][c - 1])) {
    neighbors.push({ r, c: c - 1 });
  }

  return neighbors;
}

const getToEnd = () => {
  const queue = [
    {
      r: endR,
      c: endC,
      value: 1,
    }
  ];

  while (!visited[startR][startC]) {
    const current = queue.shift();
    const neighbors = getNeighbors(current.r, current.c);
    const neighborsValue = [current.value];

    neighbors.forEach(n => {
      if (!visited[n.r][n.c]) {
        if (!queue.find(item => item.r === n.r && item.c === n.c)) {
          queue.push({...n, value: current.value + 1});
        }
      } else if (visited[n.r][n.c] > current.value) {
        neighborsValue.push(visited[n.r][n.c])
      }
    });

    visited[current.r][current.c] = Math.min(...neighborsValue);

    if (!queue.length) {
      const neighborUp = getUp(current.r, current.c);

      neighborUp.forEach(n => {
        if (!visited[n.r][n.c]) {
          queue.push({...n, value: current.value + 1});
        }
      });
    }
  }
}

getToEnd();

// const ans1 = getToEnd(endR, endC, {});
console.log('Answer', visited[startR][startC]);
