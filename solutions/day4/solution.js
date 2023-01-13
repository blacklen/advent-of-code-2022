import fs from 'fs';

const input = fs.readFileSync('./input.txt').toString().trim();

let ans1 = 0;
let ans2 = 0;

input.split('\n').map(pair => pair.split(',')).map(([p1, p2]) => {
  const [id1, id2] = p1.split('-').map(Number);
  const [id3, id4] = p2.split('-').map(Number);

  if (
    (id1 === id2 && id1 >= id3 && id1 <= id4)
    || (id3 === id4 && id3 >= id1 && id3 <= id2)
    || (id1 <= id3 && id2 >= id4)
    || (id3 <= id1 && id4 >= id2)
  ) ans1++;

  if ((id3 <= id1 && id1 <= id4) || (id3 <= id2 && id2 <= id4)
    || (id1 <= id3 && id3 <= id2) || (id1 <= id4 && id4 <= id2)
  ) {
    ans2++;
  }
});

console.log('Answer part 1: ', ans1);
console.log('Answer part 2: ', ans2);
