import fs from 'fs';

const input = fs.readFileSync('./input.txt').toString();
const calories = input.split('\n\n').map(i => i.split('\n'));
const sumCalories = calories.map(i => i.reduce((a, b) => +a + +b, 0));
let max = Math.max(...sumCalories);
let max2 = Math.max(...sumCalories.filter(i => i !== max));
let max3 = Math.max(...sumCalories.filter(i => i !== max2 && i !== max));
const topThree = [max, max2, max3];
const ans2 = topThree.reduce((a, b) => a + b, 0);

console.log('Answer par1: ', max);
console.log('Answer par2: ', ans2);
