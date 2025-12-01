import { readFileSync } from 'fs';

// Advent of Code - Day 6
// Date: 11/12/2024

const GUARD = {
    TOP: '^',
    BOTTOM: 'v',
    RIGHT: '>',
    LEFT: '<'
}
const positions = []
const WALL = '#';
let counter = 0;


function path(grid, direction, position) {
    while (true) {
        switch (direction) {
            case 'TOP':
                if (!positions.includes(`${position[0]} ${position[1]}`)) {
                    counter++;
                }
                positions.push(`${position[0]} ${position[1]}`);
                position[0]--;
                break;
            case 'BOTTOM':
                if (!positions.includes(`${position[0]} ${position[1]}`)) {
                    counter++;
                }
                positions.push(`${position[0]} ${position[1]}`);
                position[0]++;
                break;
            case 'LEFT':
                if (!positions.includes(`${position[0]} ${position[1]}`)) {
                    counter++;
                }
                positions.push(`${position[0]} ${position[1]}`);
                position[1]--;
                break;
            case 'RIGHT':
                if (!positions.includes(`${position[0]} ${position[1]}`)) {
                    counter++;
                }
                positions.push(`${position[0]} ${position[1]}`);
                position[1]++;
                break;
        }
        if (position[0] < 0 || position[0] >= grid.length || position[1] < 0 || position[1] >= grid[0].length) {
            break;
        } else if (grid[position[0]][position[1]] === WALL) {
            switch (direction) {
                case 'TOP':
                    direction = 'RIGHT';
                    position[0]++;
                    break;
                case 'BOTTOM':
                    direction = 'LEFT';
                    position[0]--;
                    break;
                case 'LEFT':
                    direction = 'TOP';
                    position[1]++;
                    break;
                case 'RIGHT':
                    direction = 'BOTTOM';
                    position[1]--;
                    break;
            }
            path(grid, direction, position);
            break;
        }
    }

}

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    let position = [0, 0];
    let direction = '';
    // Convert input string to a matrix
    const matrix = input.split('\n').map(line => line.replace(/\r/g, '').split(''));
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (Object.values(GUARD).includes(matrix[row][col])) {
                position[0] = row;
                position[1] = col;
                direction = Object.keys(GUARD).find(key => GUARD[key] === matrix[row][col]);
            }
        }
    }
    path(matrix, direction, position, counter);
    return counter;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);