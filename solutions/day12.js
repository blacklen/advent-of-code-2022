import { input12 as input } from '../input.js';

const test = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

const test2 = `Sabc
abcd
mEdd`;

const endValue = 'E'.charCodeAt();
const startValue = 'S'.charCodeAt();

const mapVal = test.split('\n').map(i => i.split('').map(c => c.charCodeAt()));
const ROW = mapVal.length;
const COL = mapVal[0].length;
let maxStep = ROW * COL;
const visited = Array.from({ length: ROW }, () => Array(COL).fill(0));

const startR = mapVal.findIndex(i => i.includes(startValue));
const startC = mapVal[startR].findIndex(i => i === startValue);

const endR = mapVal.findIndex(i => i.includes(endValue));
const endC = mapVal[endR].findIndex(i => i === endValue);

mapVal[startR][startC] = 'a'.charCodeAt();
mapVal[endR][endC] = 'z'.charCodeAt();

console.log('start', startR, startC, endR, endC);

const getNeighbors = (r, c) => {
  const neighbors = [];
  const value = mapVal[r][c];

  // up
  if (r - 1 >= 0 && [value, value + 1].includes(mapVal[r - 1][c])) {
    neighbors.push({ r: r - 1, c });
  }

  // down
  if (r + 1 < ROW && mapVal[r + 1][c] <= value + 1) {
    neighbors.push({ r: r + 1, c });
  }

  // right
  if (c + 1 < COL && mapVal[r][c + 1] <= value + 1) {
    neighbors.push({ r, c: c + 1 });
  }

  // left
  if (c - 1 >= 0 && mapVal[r][c - 1] <= value + 1) {
    neighbors.push({ r, c: c - 1 });
  }

  return neighbors;
}

// DFS
const getToEnd = (r, c, road) => {
  let points = [maxStep];

  if (r === endR && c === endC) {
    return 0;
  }

  road[`${r}-${c}`] = 1;

  const neighbors = getNeighbors(r, c);

  neighbors.forEach(neighbor => {
    const { r: nr, c: nc } = neighbor;

    if (!road[`${nr}-${nc}`]) {
      points.push(visited[nr][nc] || getToEnd(nr, nc, { ...road }));
    }
  });

  const point = Math.min(...points) + 1;

  visited[r][c] = point;

  return point;
}

const ans1 = getToEnd(startR, startC, {});
console.log('Answer', ans1, visited);
