import { readFileSync } from 'fs';

// Function to solve the puzzle
function solvePuzzle(input) {
    const grid = input
        .split('\n')
        .map(row => row.replace('\r', '').split('')); // Handle '\r' and split into characters

    const rows = grid.length;
    const cols = grid[0].length;

    let count = 0;

    // Function to check for all X-MAS patterns centered at (r, c)
    function isXMAS(r, c) {
        // Check if the X-MAS pattern fits within bounds
        if (r - 1 >= 0 && r + 1 < rows && c - 1 >= 0 && c + 1 < cols) {
            const patterns = [
                // Original M.S / .A. / M.S
                [
                    ['M', '.', 'S'],
                    ['.', 'A', '.'],
                    ['M', '.', 'S'],
                ],
                // M.M / .A. / S.S
                [
                    ['M', '.', 'M'],
                    ['.', 'A', '.'],
                    ['S', '.', 'S'],
                ],
                // S.S / .A. / M.M
                [
                    ['S', '.', 'S'],
                    ['.', 'A', '.'],
                    ['M', '.', 'M'],
                ],
                // S.M / .A. / S.M
                [
                    ['S', '.', 'M'],
                    ['.', 'A', '.'],
                    ['S', '.', 'M'],
                ],
            ];

            // Check each pattern
            for (const pattern of patterns) {
                let match = true;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const expected = pattern[i + 1][j + 1];
                        const actual = grid[r + i][c + j];
                        if (expected !== '.' && actual !== expected) {
                            match = false;
                        }
                    }
                }
                if (match) return true;
            }
        }
        return false;
    }

    // Iterate through the grid
    for (let r = 1; r < rows - 1; r++) {
        for (let c = 1; c < cols - 1; c++) {
            if (isXMAS(r, c)) {
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
