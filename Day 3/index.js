import { readFileSync } from 'fs';

// Advent of Code - Day 3
// Date: 09/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    const regex = /mul\((\d+),(\d+)\)/g;
    let multiplications = 0;
    let match;

    while ((match = regex.exec(input)) !== null) {
        // matches.push({ x: parseInt(match[1]), y: parseInt(match[2]) });
        multiplications += (parseInt(match[1]) * parseInt(match[2]));
    }

    return multiplications;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);