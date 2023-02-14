import fs from 'fs';

const input = fs.readFileSync('./input.txt').toString().trim();

const signals = input.split('\n\n').map(pair => pair.split('\n').map(p => JSON.parse(p)));

let ans1 = 0;

const isValidSignal = (val1, val2, signal) => {
  const isNumber1 = typeof val1 === 'number';
  const isNumber2 = typeof val2 === 'number';

  if (isNumber1 && isNumber2) {
    if (val1 < val2) {
      signal.value = true;
      return;
    }
    else if (val1 > val2) {
      signal.value = false;
      return;
    }
  } else if (isNumber1 || isNumber2) {
    if (isNumber1) isValidSignal([val1], val2, signal);
    else isValidSignal(val1, [val2], signal);
  } else {
    let i = 0;
    const len1 = val1.length;
    const len2 = val2.length;

    while (true) {
      if (i > len1 - 1 && i < len2) {
        signal.value = true;
        return;
      } else if (i < len1 && i > len2 - 1) {
        signal.value = false;
        return;
      } else if (i > len1 - 1 && i > len2 - 1) {
        return;
      }

      isValidSignal(val1[i], val2[i], signal);

      if (typeof signal.value !== "undefined") {
        return;
      }

      i++;
    }
  }
}

signals.forEach((pair, index) => {
  let signal = {};
  isValidSignal(pair[0], pair[1], signal);
  if (signal.value) {
    ans1 += index + 1;
  }
});

console.log('Answer', ans1);
