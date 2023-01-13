import fs from 'fs';

const input = fs.readFileSync('./input.txt').toString().trim();
const cycle = [1];
let previousVal = 1;
let CRT = '#';
let currentCycle = 1;

const draw = () => {
  const pixel = currentCycle % 40;
  CRT += Math.abs(pixel - previousVal) < 2 ? '#' : '.';
  if (pixel === 39) CRT += '\n';
}

input.split('\n').map(i => {
  const [code, value] = i.split(' ');
  const current = cycle.length - 1;
  draw();
  currentCycle++;
  cycle.push(previousVal);
  if (code === 'addx') {
    previousVal += +value;
    cycle[current + 2] = previousVal;
    draw();
    currentCycle++;
  }
});

const ans1 = [20, 60, 100, 140, 180, 220].reduce((sum, cur) => sum + (cycle[cur - 1] * cur), 0);

console.log('Answer part 1: ', ans1);
console.log('Answer part 2:\n\n', CRT);
