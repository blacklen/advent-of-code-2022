import { input2 as input } from '../input.js';

const formatInput = input.split('\n');

// A,X: rock, B,Y: Paper, C,Z: Scissors
const rates = {
  // win
  'A Y': 8,
  'B Z': 9,
  'C X': 7,

  // lose
  'A Z': 3,
  'B X': 1,
  'C Y': 2,

  // draw
  'A X': 4,
  'B Y': 5,
  'C Z': 6,
}

// X: lose, Y: draw, Z: win
const rates2 = {
  // win
  'A Z': 8,
  'B Z': 9,
  'C Z': 7,

  // lose
  'A X': 3,
  'B X': 1,
  'C X': 2,

  // draw
  'A Y': 4,
  'B Y': 5,
  'C Y': 6,
}

const sum = formatInput.reduce((res, cur) => {
  res += rates[cur];
  return res;
}, 0);

const sum2 = formatInput.reduce((res, cur) => {
  res += rates2[cur];
  return res;
}, 0);

console.log('response', sum, sum2);
