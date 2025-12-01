import { readFileSync } from 'fs';

// Advent of Code - Day 15
// Date: 16/12/2024


const robot = { row: 0, col: 0 };
const distance = 100;

function nextMove(row, col, grid, sumDirection, obj = '@') {
    switch (grid[row][col]) {
        case '#':
            break;
        case '.':
            grid[row][col] = obj;
            if (obj === '@') {
                robot.row = row;
                robot.col = col;
            }
            row -= sumDirection[0];
            col -= sumDirection[1];
            grid[row][col] = '.';
            return true;
        case 'O':
            row += sumDirection[0];
            col += sumDirection[1];
            if (nextMove(row, col, grid, sumDirection, 'O')) {
                row -= sumDirection[0];
                col -= sumDirection[1];
                grid[row][col] = obj;
                if (obj === '@') {
                    robot.row = row;
                    robot.col = col;
                }
                row -= sumDirection[0];
                col -= sumDirection[1];
                grid[row][col] = '.';
                return true;
            }
            break;
    }
}

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    const [grid, directions] = input.split(/\n\s*\n/);
    const gridLines = grid.replace(/\r/g, '').split('\n');
    const gridArray = gridLines.map(line => line.split(''));
    const directionQueue = directions.split('');
    let GPScords = 0;

    for (const element in gridArray) {
        gridArray[element].find((el, index) => {
            if (el === '@') {
                robot.row = parseInt(element);
                robot.col = index;
            }
        });
    }

    for (const element of directionQueue) {
        switch (element) {
            case '^':
                const tempRow = robot.row - 1;
                nextMove(tempRow, robot.col, gridArray, [-1, 0]);
                break;
            case '<':
                const tempCol = robot.col - 1;
                nextMove(robot.row, tempCol, gridArray, [0, -1]);
                break;
            case '>':
                const tempCol2 = robot.col + 1;
                nextMove(robot.row, tempCol2, gridArray, [0, 1]);
                break;
            case 'v':
                const tempRow2 = robot.row + 1;
                nextMove(tempRow2, robot.col, gridArray, [1, 0]);
                break;
        }
    }

    for (let i = 0; i < gridArray.length; i++) {
        for (let j = 0; j < gridArray[i].length; j++) {
            if (gridArray[i][j] === 'O') {
                GPScords += distance * i + j;
            }
        }
    }
    return GPScords;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);