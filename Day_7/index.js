import { readFileSync } from 'fs';

// Advent of Code - Day 7
// Date: 12/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    const lines = input.split('\n');
    const separatedData = lines.map(line => {
        const [key, values] = line.split(': ');
        return {
            key: parseInt(key),
            values: values.split(' ').map(Number)
        };
    });
    let sum = 0;

    for (let i = 0; i < separatedData.length; i++) {
        const { key, values } = separatedData[i];
        let found = false;

        function dfs(index, currentValue) {
            if (index === values.length) {
                if (currentValue === key) {
                    found = true;
                }
                return;
            }
            dfs(index + 1, currentValue + values[index]);
            dfs(index + 1, currentValue * values[index]);
        }

        dfs(1, values[0]);

        if (found) {
            sum += key;
        }
    }

    return sum;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);