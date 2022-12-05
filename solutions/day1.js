import { input1 as input } from '../input.js';

const formatInput = input.split('\n\n').map(i => i.split('\n'));
const sumList = formatInput.map(i => i.reduce((a, b) => +a + +b, 0));
let max = Math.max(...sumList);
let max2 = Math.max(...sumList.filter(i => i !== max));
let max3 = Math.max(...sumList.filter(i => i !== max2 && i !== max));
console.log('max', max);

const topThree = [max, max2, max3];
console.log('sum top three max', topThree.reduce((a,b) => a + b, 0));
