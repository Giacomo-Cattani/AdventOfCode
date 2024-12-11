import { readFileSync } from 'fs';

// Advent of Code - Day 6
// Date: 10/12/2024

const GUARD = {
    TOP: '^',
    BOTTOM: 'v',
    RIGHT: '>',
    LEFT: '<'
}
const WALL = '#';
let counter = 0;
let bumps = [];

function path(grid, direction, inPosition) {
    while (true) {
        switch (direction) {
            case 'TOP':
                inPosition[0]--;
                break;
            case 'BOTTOM':
                inPosition[0]++;
                break;
            case 'LEFT':
                inPosition[1]--;
                break;
            case 'RIGHT':
                inPosition[1]++;
                break;
        }
        if (inPosition[0] < 0 || inPosition[0] >= grid.length || inPosition[1] < 0 || inPosition[1] >= grid[0].length) {
            break;
        } else if (grid[inPosition[0]][inPosition[1]] === WALL) {
            if (bumps.includes(`${inPosition[0]} ${inPosition[1]} ${direction}`)) {
                counter++;
                break;
            }
            bumps.push(`${inPosition[0]} ${inPosition[1]} ${direction}`);
            switch (direction) {
                case 'TOP':
                    direction = 'RIGHT';
                    inPosition[0]++;
                    break;
                case 'BOTTOM':
                    direction = 'LEFT';
                    inPosition[0]--;
                    break;
                case 'LEFT':
                    direction = 'TOP';
                    inPosition[1]++;
                    break;
                case 'RIGHT':
                    direction = 'BOTTOM';
                    inPosition[1]--;
                    break;
            }
            path(grid, direction, inPosition);
            break;
        }
    }
}

// Function to solve the puzzle
function solvePuzzle(input) {
    let direction = '';
    // Convert input string to a matrix
    const matrix = input.split('\n').map(line => line.replace(/\r/g, '').split(''));
    let position = [0, 0];
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (Object.values(GUARD).includes(matrix[row][col])) {
                position[0] = row;
                position[1] = col;
                direction = Object.keys(GUARD).find(key => GUARD[key] === matrix[row][col]);
            }
        }
    }

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            const tempPos = [...position];
            bumps = [];
            if (matrix[row][col] === '.') {
                let tempMatrix = matrix.map(row => row.slice());
                tempMatrix[row][col] = WALL;
                path(tempMatrix, direction, tempPos);

            }
        }
    }
    return counter;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);