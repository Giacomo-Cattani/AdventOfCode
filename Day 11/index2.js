import { readFileSync } from 'fs';

// Advent of Code - Day 11
// Date: 14/12/2024

const BLINKING = 75;

// Function to solve the puzzle
function solvePuzzle(input) {
    let stones = input.split(' ').map((x) => ({ val: parseInt(x), amount: 1 }));
    console.log(stones);
    for (let run = 0; run < BLINKING; run++) {
        let newStones = [];
        for (let i = 0; i < stones.length; i++) {
            let curr = stones[i];
            if (curr.val === 0) {
                matchAndAdd({ val: 1, amount: curr.amount }, newStones);
            } else if (`${curr.val}`.length % 2 === 0) {
                const middle = `${curr.val}`.length / 2;
                const first = parseInt(`${curr.val}`.slice(0, middle));
                const second = parseInt(`${curr.val}`.slice(middle));
                matchAndAdd({ val: first, amount: curr.amount }, newStones);
                matchAndAdd({ val: second, amount: curr.amount }, newStones);
            } else {
                matchAndAdd({ val: curr.val * 2024, amount: curr.amount }, newStones);
            }
        }
        stones = newStones;
    }

    let res = 0;
    stones.forEach((stone) => {
        res += stone.amount;
    });

    return res;
}

const matchAndAdd = (stone, stones) => {
    const match = stones.find((x) => x.val === stone.val);
    if (match) match.amount += stone.amount;
    else stones.push(stone);
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);