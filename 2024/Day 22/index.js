import { readFileSync } from 'fs';

// Advent of Code - Day 22
// Date: 22/12/2024

const ITERATION = 2000;

function mix(a, b) {
    return (a ^ b);
}

function prune(a) {
    return (a % 16777216);
}

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    const lines = input.replace(/\r/g, '').split('\n');
    let result = 0;
    for (const number of lines) {
        let secretNumber = number;
        for (let i = 0; i < ITERATION; i++) {
            const step1 = secretNumber * 64;
            secretNumber = mix(step1, secretNumber) >>> 0;
            secretNumber = prune(secretNumber);

            const step2 = Math.floor(secretNumber / 32);
            secretNumber = mix(step2, secretNumber) >>> 0;
            secretNumber = prune(secretNumber);

            const step3 = secretNumber * 2048;
            secretNumber = mix(step3, secretNumber) >>> 0;
            secretNumber = prune(secretNumber);

        }

        result += secretNumber;
    }

    return result;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);