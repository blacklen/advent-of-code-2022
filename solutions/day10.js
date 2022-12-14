import { input10 as input } from '../input.js';

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
console.log('Answer', ans1);
console.log('Part 2', CRT);
