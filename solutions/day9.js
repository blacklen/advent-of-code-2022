import { input9 as input } from '../input.js';

// part 1
const map = { '0-0': 1 };
const head = [0, 0];
let tail = [0, 0];

// expect tail move to current head
const move = (direction) => {
  const [xh, yh] = head;
  const [xt, yt] = tail;
  let isValid = false;

  switch (direction) {
    case 'R':
      if (xt + 1 === xh && (yt === yh || yt - 1 === yh || yt + 1 === yh)) isValid = true;
      head[0]++;
      break;
    case 'L':
      if (xt - 1 === xh && (yt === yh || yt - 1 === yh || yt + 1 === yh)) isValid = true;
      head[0]--;
      break;
    case 'U':
      if (yt + 1 === yh && (xt === xh || xt + 1 === xh || xt - 1 === xh)) isValid = true;
      head[1]++;
      break;
    case 'D':
      if (yt - 1 === yh && (xt === xh || xt + 1 === xh || xt - 1 === xh)) isValid = true;
      head[1]--;
      break;
    default:
      break;
  }

  if (isValid) {
    tail = [xh, yh];
    map[`${xh}-${yh}`] = 1;
  }
}

input.split('\n').map(i => i.split(' ')).map(([direction, value]) => {
  for (let i = 0; i < value; i++) move(direction);
});

// part 2

const map2 = {'0-0': 1};
const knots = Array.from({ length: 10 }, () => [0, 0]);

// inspired by https://github.com/tpatel/advent-of-code-2022/blob/main/day09.mjs
const follow = ([x1, y1], [x2, y2]) => {
  const distance = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));

  if (distance > 1) {
    let x = x1 - x2; // 0 || -1 || -2 || 1 || 2
    x2 += Math.abs(x) === 2 ? x / 2 : x;
    let y = y1 - y2;
    y2 += Math.abs(y) === 2 ? y / 2 : y;
  }

  return [x2, y2];
}

const moveKnot = (direction, knot) => {
  switch (direction) {
    case 'R':
      knot[0]++;
      break;
    case 'L':
      knot[0]--;
      break;
    case 'U':
      knot[1]++;
      break;
    case 'D':
      knot[1]--;
      break;
    default:
      break;
  }
}

input.split('\n').map(i => i.split(' ')).map(([direction, value]) => {
  for (let i = 0; i < value; i++) {
    moveKnot(direction, knots[0]);

    for (let j = 1; j < knots.length; j++) {
      knots[j] = follow(knots[j - 1], knots[j]);
    }

    const [xt, yt] = knots[knots.length - 1];
    map2[`${xt}-${yt}`] = 1;
  }
});

const ans1 = Object.entries(map).length;
const ans2 = Object.entries(map2).length;

console.log('Answer', ans1, ans2);
