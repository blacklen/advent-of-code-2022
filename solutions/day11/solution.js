import fs from 'fs';

const input = fs.readFileSync('./input.txt').toString().trim();
const extractNumber = (string) => {
  return +string.replace(/\D/g,'');
}

const extractItems = (string) => {
  return string.split(': ')[1].split(', ').map(Number);
}

const extractOperation = (string) => {
  return string.split(': ')[1].split('= ')[1];
}

const operate = (operation, val, test, divider) => {
  const value = eval(operation.replaceAll('old', val));
  const level = divider ? value % divider : value / 3;
  return [level, level % test];
}

const monkeys = input.split('\n\n').map(text => {
  const [id, items, operation, test, trueAction, falseAction] = text.split('\n');

  return {
    id: extractNumber(id),
    items: extractItems(items),
    operation: extractOperation(operation),
    test: extractNumber(test),
    trueAction: extractNumber(trueAction),
    falseAction: extractNumber(falseAction),
    inspectCounter: 0,
  };
});

const run = (numOfRound, divider) => {
  for (let i = 0; i < numOfRound; i++) {
    monkeys.map(monkey => {
      const { operation, test, items, trueAction, falseAction } = monkey;
      while (items.length) {
        const item = items.shift();
        const [level, result] = operate(operation, item, test, divider);

        if (result === 0) monkeys[trueAction].items.push(level);
        else monkeys[falseAction].items.push(level);
        monkey.inspectCounter++;
      }
    });
  }
}

const divider = monkeys.reduce((res, cur) => res * cur.test, 1);

// part 1 have divider = 3
// part 2 have divider = total sum divisible testing
run(10000, divider);

const inspectCounter = monkeys.map(monkey => monkey.inspectCounter).sort((a, b) => b - a);
const ans = inspectCounter[0] * inspectCounter[1];

console.log('Answer part 2: ', ans);
