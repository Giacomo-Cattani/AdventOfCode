import { readFileSync } from 'fs';

// Advent of Code - Day 9
// Date: 12/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    const inputArray = input.split('\n').map(line => line.split('').map(Number));
    const transformedArray = inputArray.flat().map(num => num.toString().split('').map(Number)).flat();
    const diskmap = [];
    let counter = 0;
    let value = 0

    for (let i = 0; i < transformedArray.length; i++) {

        if (i % 2 !== 0) {
            for (let j = 0; j < transformedArray[i]; j++) {
                diskmap.push('.')
            }
        } else {
            for (let j = 0; j < transformedArray[i]; j++) {
                diskmap.push(counter)
            }
            counter++;
        }
    }

    for (let i = 0; i < diskmap.length; i++) {
        if (diskmap[i] === '.') {
            for (let j = diskmap.length - 1; j > 0; j--) {
                if (diskmap[j] !== '.' && j > i) {
                    diskmap[i] = diskmap[j];
                    diskmap[j] = '.';
                    break;
                }
            }
        }
    }

    for (const index in diskmap) {
        if (diskmap[index] == '.')
            break
        value += (index * diskmap[index]);
    }

    return value;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);