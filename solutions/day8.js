import { input8 as input } from '../input.js';

let ans1 = 0;
let ans2 = 0;

const trees = input.split('\n').map(item => item.split('').map(Number));
const ROW = trees.length - 1;
const COL = trees[0].length - 1;

trees.map((tree, row) => {
  if (row === 0 || row === ROW) ans1 += tree.length;
  else {
    tree.map((height, col) => {
      if (col === 0 || col === COL) ans1++;
      else {
        let top = true, right = true, bot = true, left = true;
        let tview = 0, rview = 0, bview = 0, lview = 0;

        // check top and bot
        for (let i = 0; i <= ROW; i++) {
          const h = trees[i][col];

          if (h >= height && i < row) {
            tview = row - i;
            top = false;
          }

          if (h >= height && i > row) {
            bview = i - row;
            bot = false;
          }

          // for part 1 only
          // if (!bot && !top) break;

          // for part 2
          if (bview) break;
        }

        // check right and left
        for (let i = 0; i <= COL; i++) {
          const h = trees[row][i];

          if (h >= height && i < col) {
            lview = col - i;
            left = false;
          }

          if (h >= height && i > col) {
            rview = i - col;
            right = false;
          }

          // for part 1 only
          // if (!left && !right) break;

          // for part 2
          if (rview) break;
        }

        if (!tview) tview = row;
        if (!bview) bview = ROW - row;
        if (!lview) lview = col;
        if (!rview) rview = COL - col;

        const totalView = tview * rview * bview * lview;

        if (totalView > ans2) ans2 = totalView;
        if (top || right || bot || left) ans1++;
      }
    })
  }
});

console.log('Answer', ans1, ans2);

