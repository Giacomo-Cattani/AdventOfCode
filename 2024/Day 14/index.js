import { readFileSync } from 'fs';

// Advent of Code - Day 14
// Date: 16/12/2024

const rows = 103
const cols = 101
const grid =
    Array.from({ length: rows }, () => Array(cols).fill('.'));

const numIterations = 100;

function timeSkip(objects, grid) {
    let iterator = 0;
    while (iterator < numIterations) {
        for (const { p, v } of objects) {
            p.x = (p.x + v.x + grid[0].length) % grid[0].length;
            p.y = (p.y + v.y + grid.length) % grid.length;
        }
        iterator++;
    }
    for (const { p, v } of objects) {
        if (grid[p.y][p.x] === 1) {
            grid[p.y][p.x] += 1;
        } else {
            grid[p.y][p.x] = 1;
        }
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

    const quadrants = {
        topLeft: [],
        topRight: [],
        bottomLeft: [],
        bottomRight: []
    };

    const midRow = Math.floor(grid.length / 2);
    const midCol = Math.floor(grid[0].length / 2);

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (i < midRow && j < midCol) {
                quadrants.topLeft.push(grid[i][j]);
            } else if (i < midRow && j > midCol) {
                quadrants.topRight.push(grid[i][j]);
            } else if (i > midRow && j < midCol) {
                quadrants.bottomLeft.push(grid[i][j]);
            } else if (i > midRow && j > midCol) {
                quadrants.bottomRight.push(grid[i][j]);
            }
        }
    }

    for (const element of Object.values(quadrants)) {
        const count = element.filter(e => typeof e === 'number');
        const sum = count.reduce((acc, val) => acc + val, 0);
        value *= sum;
    }
    return value;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);