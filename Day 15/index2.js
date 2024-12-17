import { readFileSync } from 'fs';
import { json } from 'stream/consumers';

// Advent of Code - Day 15
// Date: 16/12/2024


const robot = { row: 0, col: 0 };
const distance = 100;
const moves = []

function nextMove(row, col, grid, sumDirection, obj = '@', move = true) {
    // console.log(row, col, grid[row][col], sumDirection, obj)
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

                moves.push({ 'points': [[trow, tcol], [row, col]], 'obj': ['.', obj] });
                return true;
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
                console.log(iObj)
                const tempRow = iObj[0][0] - sumDirection[0];
                const tempCol = iObj[0][1] - sumDirection[1];
                const tempRow2 = iObj[1][0] - sumDirection[0];
                const tempCol2 = iObj[1][1] - sumDirection[1];
                console.log('resultPrimo:', nextMove(iObj[0][0], iObj[0][1], grid, sumDirection, grid[tempRow][tempCol], false))
                console.log('resultSecondo:', nextMove(iObj[1][0], iObj[1][1], grid, sumDirection, grid[tempRow2][tempCol2], false))
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
                    return true;
                }
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

                    moves.push({ 'points': [[trow, tcol], [row, col]], 'obj': ['.', obj] });
                    return true;
                }
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
        console.table(gridArray)
        // console.dir(moves, { depth: null })
        switch (element) {
            case '^':
                console.log(element);
                const tempRow = robot.row - 1;
                nextMove(tempRow, robot.col, gridArray, [-1, 0]);
                break;
            case '<':
                console.log(element);
                const tempCol = robot.col - 1;
                nextMove(robot.row, tempCol, gridArray, [0, -1]);
                break;
            case '>':
                console.log(element);
                const tempCol2 = robot.col + 1;
                nextMove(robot.row, tempCol2, gridArray, [0, 1]);
                break;
            case 'v':
                console.log(element);
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