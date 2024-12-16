import { readFileSync, writeFileSync, openSync } from 'fs';

// Advent of Code - Day 14
// Date: 16/12/2024

const rows = 103
const cols = 101
const grid =
    Array.from({ length: rows }, () => Array(cols).fill('.'));

const numIterations = 10000;

async function timeSkip(objects, grid) {
    let iterator = 1;
    openSync('output.txt', 'w');
    while (iterator < numIterations) {
        for (const { p, v } of objects) {
            if (typeof grid[p.y][p.x] === 'number' && grid[p.y][p.x] > 1) {
                grid[p.y][p.x] -= 1;
            } else {
                grid[p.y][p.x] = '.';
            }
            p.x = (p.x + v.x + grid[0].length) % grid[0].length;
            p.y = (p.y + v.y + grid.length) % grid.length;
        }
        for (const { p, v } of objects) {
            if (grid[p.y][p.x] === 1) {
                grid[p.y][p.x] += 1;
            } else {
                grid[p.y][p.x] = 1;
            }
        }
        const uniqueString = grid.map(row => row.join('')).join('\n');

        writeFileSync('output.txt', `i: ${iterator}\n------------------------------------------------------------------------------------------------\n${uniqueString}\n`, { flag: 'a' });

        iterator++;
    }

}

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    const inputArray = input.split('\r\n');
    const objects = inputArray.map(line => {
        const [p, v] = line.split(' ');
        const [px, py] = p.slice(2).split(',').map(Number);
        const [vx, vy] = v.slice(2).split(',').map(Number);
        return { p: { x: px, y: py }, v: { x: vx, y: vy } };
    });
    let value = 1;
    timeSkip(objects, grid);

    return value;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log('Find the Easter Egg on the output.txt');
console.log('Search "1111111111" in the file');