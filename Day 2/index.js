import { readFileSync } from 'fs';

// Advent of Code - Day 2
// Date: 09/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    const rows = input.split('\n');
    let count = 0;
    for (const row of rows) {
        let safe = true;
        let levelType;
        const numbers = row.split(' ').map(Number);
        for (let i = 0; i < numbers.length - 1; i++) {
            if (numbers[i] > numbers[i + 1]) {
                if (levelType === "increasing") {
                    safe = false;
                    break;
                }
                levelType = "decreasing";
            } else {
                if (levelType === "decreasing") {
                    safe = false;
                    break;
                }
                levelType = "increasing";
            }
            if (!(Math.abs(numbers[i] - numbers[i + 1]) > 0) || !(Math.abs(numbers[i] - numbers[i + 1]) < 4)) {
                safe = false;
                break;
            }
        }

        if (safe)
            count++;
    }
    return count;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);