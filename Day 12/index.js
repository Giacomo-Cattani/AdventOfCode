import { readFileSync } from 'fs';

// Advent of Code - Day 12
// Date: 15/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    const inputArray = input.split('\r\n');
    const regions = [];
    let price = 0;

    for (let i = 0; i < inputArray.length; i++) {
        for (let j = 0; j < inputArray[i].length; j++) {
            const letter = inputArray[i][j];
            if (!regions.some(region => region.region.includes(`${i},${j}`))) {
                const region = [];
                const stack = [[i, j]];
                while (stack.length > 0) {
                    const [x, y] = stack.pop();
                    if (x >= 0 && x < inputArray.length && y >= 0 && y < inputArray[x].length && inputArray[x][y] === letter && !region.includes(`${x},${y}`)) {
                        region.push(`${x},${y}`);
                        stack.push([x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]);
                    }
                }
                let perimeter = 0;
                for (const coord of region) {
                    const [x, y] = coord.split(',').map(Number);
                    if (x === 0 || inputArray[x - 1][y] !== letter) perimeter++;
                    if (x === inputArray.length - 1 || inputArray[x + 1][y] !== letter) perimeter++;
                    if (y === 0 || inputArray[x][y - 1] !== letter) perimeter++;
                    if (y === inputArray[x].length - 1 || inputArray[x][y + 1] !== letter) perimeter++;
                }
                regions.push({ letter, region, perimeter });
            }
        }
    }
    regions.forEach(({ region, perimeter }) => {
        price += region.length * perimeter;
    });
    return price;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);
