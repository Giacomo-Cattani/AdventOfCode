import { readFileSync } from 'fs';

// Advent of Code - Day 25
// Date: 25/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    // Split the input into groups of grids
    const grids = input.replace(/\r/g, '').split('\n\n');
    // Separate grids into two groups
    const firstLineHashGrids = [];
    const lastLineHashGrids = [];

    grids.forEach(grid => {
        const lines = grid.split('\n');
        if (lines[0][0] === '#') {
            firstLineHashGrids.push(lines);
        }
        if (lines[lines.length - 1][lines[0].length - 1] === '#') {
            lastLineHashGrids.push(lines);
        }
    });

    // Function to convert grid to the required format
    function convertGrid(grid) {
        const columns = grid[0].length;
        const result = [];
        for (let col = 0; col < columns; col++) {
            let count = 0;
            for (let row = 0; row < grid.length; row++) {
                if (grid[row][col] === '#') {
                    count++;
                }
            }
            result.push(count - 1);
        }
        return result;
    }

    // Convert the first group of grids
    const firstGroupResults = firstLineHashGrids.map(convertGrid);

    // Convert the second group of grids
    const secondGroupResults = lastLineHashGrids.map(convertGrid);

    const numberOfRows = firstLineHashGrids[0].length;
    let count = 0;
    for (const lock of firstGroupResults) {
        for (const key of secondGroupResults) {
            const sum = lock.map((num, idx) => num + key[idx]);
            if (sum.find(num => num >= numberOfRows - 1)) {
                continue;
            } else {
                count++;
            }
        }
    }

    return count;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);