import { readFileSync } from 'fs';
import { json } from 'stream/consumers';

// Advent of Code - Day 15
// Date: 16/12/2024

const robot = { row: 0, col: 0 };
const distance = 100;
const movedBoxes = []

function scaleUpWarehouse(grid) {
    const scaledGrid = [];
    for (const row of grid) {
        const newRow1 = [];
        for (const cell of row) {
            switch (cell) {
                case '#':
                    newRow1.push('#', '#');
                    break;
                case 'O':
                    newRow1.push('[', ']');
                    break;
                case '.':
                    newRow1.push('.', '.');
                    break;
                case '@':
                    newRow1.push('@', '.');
                    break;
            }
        }
        scaledGrid.push(newRow1);
    }
    return scaledGrid;
}

function nextMove(row, col, grid, sumDirection, obj = '@', move = true) {
    switch (grid[row][col]) {
        case '#':
            return false;
        case '.':
            if (move) {
                grid[row][col] = obj;
                if (obj === '@') {
                    robot.row = row;
                    robot.col = col;
                }
                const trow = row - sumDirection[0];
                const tcol = col - sumDirection[1];
                grid[trow][tcol] = '.';
                if (obj === '[' || obj === ']') {
                    movedBoxes.push({ from: [trow, tcol], to: [row, col], state: true });
                }
            }
            return true;
        case '[':
        case ']':
            if ((sumDirection[0] == -1 && sumDirection[1] == 0) || (sumDirection[0] == 1 && sumDirection[1] == 0)) {
                let iObj = []
                if (grid[row][col] === '[') {
                    iObj = [[row - 1, col], [row - 1, col + 1]]
                } else {
                    iObj = [[row - 1, col - 1], [row - 1, col]]
                }
                const tempRow = iObj[0][0] - sumDirection[0];
                const tempCol = iObj[0][1] - sumDirection[1];
                const tempRow2 = iObj[1][0] - sumDirection[0];
                const tempCol2 = iObj[1][1] - sumDirection[1];
                if (nextMove(iObj[0][0], iObj[0][1], grid, sumDirection, grid[tempRow][tempCol], false) && nextMove(iObj[1][0], iObj[1][1], grid, sumDirection, grid[tempRow2][tempCol2], false)) {

                    nextMove(iObj[0][0], iObj[0][1], grid, sumDirection, grid[tempRow][tempCol]);
                    nextMove(iObj[1][0], iObj[1][1], grid, sumDirection, grid[tempRow2][tempCol2])

                    if (obj === '@') {
                        grid[row][col] = obj;
                        const tRow = row - sumDirection[0];
                        grid[tRow][col] = '.';
                        robot.row = row;
                        robot.col = col;
                    }

                    movedBoxes.push({ from: [row, col], to: [row + sumDirection[0], col + sumDirection[1]], state: true });

                    return true;
                }
                movedBoxes.push({ from: [row, col], to: [row + sumDirection[0], col + sumDirection[1]], state: false });
                return false;
            } else {

                const obj2 = grid[row][col];
                row += sumDirection[0];
                col += sumDirection[1];
                if (nextMove(row, col, grid, sumDirection, obj2)) {
                    row -= sumDirection[0];
                    col -= sumDirection[1];
                    grid[row][col] = obj;
                    if (obj === '@') {
                        robot.row = row;
                        robot.col = col;
                    }
                    const trow = row - sumDirection[0];
                    const tcol = col - sumDirection[1];
                    grid[trow][tcol] = '.';
                } else {
                    // If the next move is not valid, revert the row and col changes
                    row -= sumDirection[0];
                    col -= sumDirection[1];
                }
                movedBoxes.push({ from: [row, col], to: [row + sumDirection[0], col + sumDirection[1]], state: true });
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
    const scaledGridArray = scaleUpWarehouse(gridArray);
    const directionQueue = directions.split('');
    let GPScords = 0;

    for (const element in scaledGridArray) {
        scaledGridArray[element].find((el, index) => {
            if (el === '@') {
                robot.row = parseInt(element);
                robot.col = index;
            }
        });
    }

    for (const element of directionQueue) {
        if (movedBoxes.some(box => box.state === false)) {
            for (const box of movedBoxes) {
                if (box.state) {
                    const [fromRow, fromCol] = box.from;
                    const [toRow, toCol] = box.to;
                    if (scaledGridArray[toRow][toCol] !== '.') {
                        scaledGridArray[fromRow][fromCol] = scaledGridArray[toRow][toCol];
                        scaledGridArray[toRow][toCol] = '.';
                    }
                }
            }
        }
        movedBoxes.length = 0;
        console.table(scaledGridArray);
        switch (element) {
            case '^':
                const tempRow = robot.row - 1;
                nextMove(tempRow, robot.col, scaledGridArray, [-1, 0]);
                break;
            case '<':
                const tempCol = robot.col - 1;
                nextMove(robot.row, tempCol, scaledGridArray, [0, -1]);
                break;
            case '>':
                const tempCol2 = robot.col + 1;
                nextMove(robot.row, tempCol2, scaledGridArray, [0, 1]);
                break;
            case 'v':
                const tempRow2 = robot.row + 1;
                nextMove(tempRow2, robot.col, scaledGridArray, [1, 0]);
                break;
        }
    }

    console.table(scaledGridArray);
    for (let i = 0; i < scaledGridArray.length; i++) {
        for (let j = 0; j < scaledGridArray[i].length; j++) {
            if (scaledGridArray[i][j] === '[') {
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