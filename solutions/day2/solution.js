import fs from 'fs';

const input = fs.readFileSync('./input.txt').toString().trim();
const strategy = input.split('\n');

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

const ans1 = strategy.reduce((res, cur) => {
  res += rates[cur];
  return res;
}, 0);

const ans2 = strategy.reduce((res, cur) => {
  res += rates2[cur];
  return res;
}, 0);

console.log('Answer part 1: ', ans1);
console.log('Answer part 2: ', ans2);
