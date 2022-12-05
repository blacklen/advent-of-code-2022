import { input3 as input } from '../input.js';

const formatInput = input.split('\n');
const offset = 'a'.charCodeAt();

const res = formatInput.reduce((sum, i) => {
  const mid = i.length / 2;
  const firstHalf = i.substring(0, mid);
  const secondHalf = i.substring(mid, i.length);
  firstHalf.split('').some(c => {
    if (secondHalf.includes(c)) {
      const value = c.charCodeAt();
      sum += value >= offset ? value - offset + 1 : value - 65 + 27;
      return true;
    }
    return false;
  })

  return sum;
}, 0);

console.log('sum half-half', res);

const group = [];
let index = 0;

while (index < formatInput.length) {
  group.push(formatInput.slice(index, index + 3));
  index += 3;
}

const sumGroup = group.reduce((sum, i) => {
  i[0].split('').some(c => {
    if (i[1].includes(c) && i[2].includes(c)) {
      const value = c.charCodeAt();
      sum += value >= offset ? value - offset + 1 : value - 65 + 27;
      return true;
    }
    return false;
  })

  return sum;
}, 0);

console.log('sum group', sumGroup);

