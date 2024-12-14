import { readFileSync } from 'fs';

// Advent of Code - Day 11
// Date: 14/12/2024

const BLINKING = 25;

// Function to solve the puzzle
function solvePuzzle(input) {

    const inputArray = input.split(' ').map(Number);

    for (let i = 0; i < BLINKING; i++) {
        for (let j = 0; j < inputArray.length; j++) {
            if (inputArray[j] === 0) {
                inputArray[j] = 1;
            } else if (inputArray[j].toString().length % 2 === 0) {
                const numStr = inputArray[j].toString();
                const mid = Math.floor(numStr.length / 2);
                inputArray[j] = parseInt(numStr.slice(0, mid));
                inputArray.splice((j + 1), 0, parseInt(numStr.slice(mid)));
                j++;
            } else {
                inputArray[j] = inputArray[j] * 2024;
            }
        }
    }

    return inputArray.length;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);