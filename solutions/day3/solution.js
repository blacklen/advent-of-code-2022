import fs from 'fs';

const input = fs.readFileSync('./input.txt').toString().trim();
const formatInput = input.split('\n');
const offset = 'a'.charCodeAt();

const ans1 = formatInput.reduce((sum, i) => {
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

const group = [];
let index = 0;

while (index < formatInput.length) {
  group.push(formatInput.slice(index, index + 3));
  index += 3;
}

const ans2 = group.reduce((sum, i) => {
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

console.log('Answer part 1: ', ans1);
console.log('Answer part 2: ', ans2);

