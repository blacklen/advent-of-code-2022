import fs from 'fs';

const input = fs.readFileSync('./input.txt').toString().trim();

const test = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

const signals = test.split('\n\n').map(pair => pair.split('\n').map(p => JSON.parse(p)));

let ans1 = 0;

const getArrayValue = (array) => {
  const val = array.shift();

  if (typeof val === 'object') {
    if (!val.join()) return val.length.toString();
    return val.join();
  }

  return val.toString();
}

const isValidSignal = (val1, val2) => {
  let signal = 1;

  while (val1.length && val2.length) {
    const length1 = typeof val1[0] === 'object' && val1[0].length;
    const length2 = typeof val2[0] === 'object' && val2[0].length;
    if (length1 && length2 && length1 !== length2) {
      const item2 = val2[0];

      val1[0].some((item, index) => {
        if (!item2[index]) return true;

        item2[index] = typeof item2[index] === 'number' ? [item2[index]] : item2[index];
        if (typeof item === 'object' && item.length > item2[index].length) {
          item2[index].push(...Array(item.length - item2[index].length).fill(0));
        }
      });

      val2[0] = item2;
    }
    const a1 = getArrayValue(val1);
    const a2 = getArrayValue(val2);

    if (a1 > a2) {
      signal = false;
      break;
    } else if (a1 < a2) {
      signal = true;
      break;
    }
  }

  if (signal === 1 && val1.length) return false;

  return signal;
}

signals.forEach((pair, index) => {
  if (isValidSignal(pair[0], pair[1])) {
    ans1 += index + 1;
  }
});

console.log('Answer', ans1);
