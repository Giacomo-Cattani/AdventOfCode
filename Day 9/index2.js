import { readFileSync } from 'fs';

// Advent of Code - Day 9
// Date: 13/12/2024

// Function to find the positions and count of '.' in the diskmap
function findDots(diskmap) {
    const dotPositions = [];
    let dotCount = 0;
    let startIndex = -1;
    let queueCount = 0;

    for (let i = 0; i < diskmap.length; i++) {
        if (diskmap[i] === '.') {
            dotPositions.push(i);
            dotCount++;
            if (startIndex === -1) {
                startIndex = i;
            }
        } else if (startIndex !== -1) {
            queueCount++;
        }
    }

    return { dotPositions, dotCount, startIndex, queueCount };
}

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    const inputArray = input.split('\n').map(line => line.split('').map(Number));
    const transformedArray = inputArray.flat().map(num => num.toString().split('').map(Number)).flat();
    const diskmap = [];
    let counter = 0;
    let value = 0
    let length = 0;

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

    console.log(findDots(diskmap));

    for (let i = diskmap.length - 1; i > 0; i--) {
        while (diskmap[i] == diskmap[i - 1]) {
            length++;
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