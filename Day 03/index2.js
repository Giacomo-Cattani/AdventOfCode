import { readFileSync } from 'fs';

// Advent of Code - Day 3
// Date: 09/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    const regex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;
    const matches = input.match(regex);
    let result = 0;

    let instruction = true;

    for (const action in matches) {
        if (matches[action] === 'do()') {
            instruction = true;
        } else if (matches[action] === 'don\'t()') {
            instruction = false;
        } else {
            if (instruction) {
                const [x, y] = matches[action].match(/\d+/g);
                result += x * y;
            }
        }
    }
    return result;
    // return multiplications;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);