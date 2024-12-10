import { readFileSync } from 'fs';

// Advent of Code - Day 4
// Date: 09/12/2024

// This function checks if the given coordinate is valid
function validCoord(x, y, m, n) {
    return (x >= 0 && x < m && y >= 0 && y < n);
}

// This function searches for the given word in a given direction from the coordinate.
function findWord(index, word, grid, x, y, dirX, dirY) {
    // if word has been found
    if (index === word.length) return true;

    // if the current coordinate is valid and characters match, then check the next index
    if (validCoord(x, y, grid.length, grid[0].length) && word[index] === grid[x][y]) {
        return findWord(index + 1, word, grid, x + dirX, y + dirY, dirX, dirY);
    }

    return false;
}

// This function calls findWord for each coordinate
function searchWord(grid, word) {
    let m = grid.length;
    let n = grid[0].length;

    let ans = [];

    // x and y are used to set the direction in which word needs to be searched.
    let x = [-1, -1, -1, 0, 0, 1, 1, 1];
    let y = [-1, 0, 1, -1, 1, -1, 0, 1];

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // Search in all 8 directions
            for (let k = 0; k < 8; k++) {
                // If word is found, then append the coordinates into answer.
                if (findWord(0, word, grid, i, j, x[k], y[k])) {
                    ans.push([i, j]);
                }
            }
        }
    }

    return ans;
}

function printResult(ans) {
    for (let i = 0; i < ans.length; i++) {
        console.log("{" + ans[i][0] + "," + ans[i][1] + "}");
    }
}

// Function to solve the puzzle
function solvePuzzle(input) {
    const lines = input.split('\n');
    const grid = lines.map(line => line.split(''));

    const word = "XMAS";

    const ans = searchWord(grid, word);

    return ans.length;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);
