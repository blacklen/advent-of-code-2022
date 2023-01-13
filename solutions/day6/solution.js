import fs from 'fs';

const input = fs.readFileSync('./input.txt').toString().trim();

function hasRepeats(str) {
  return /(.).*\1/.test(str);
}

// change signal to 14 for part2
const signal = 4;
let ans = 0;
let marker = input.substring(ans, ans + signal);

while (ans < input.length - signal) {
  if (hasRepeats(marker)) {
    ans++;
    marker = input.substring(ans, ans + signal);
  } else break;
}

console.log('Answer part 1:', ans + signal);
