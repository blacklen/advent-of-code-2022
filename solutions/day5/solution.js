import input from './input.js';

const container = input.stack.split('\n  ')
  .map(i => i.replaceAll('    ', '-').replaceAll(' ', '').replace(/[\[\]]/g, ''));

const stacks = Array.from({ length: container.pop().length }, () => []);
container.map(item => item.split('').map((c, index) => {
  if (c !== '-') stacks[index].push(c);
}));

input.commands.split('\n')
  .map(command => command.match(/\d+/g, '').map(Number))
  .map(([length, source, target]) => {
    // remove reverse() for part 2
    stacks[target - 1] = [...stacks[source - 1].splice(0, length).reverse(), ...stacks[target - 1]]
  });

const ans1 = stacks.map(i => i[0]).join('');

console.log('Answer part 1:', ans1);

