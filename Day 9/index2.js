import { readFileSync } from 'fs';

// Advent of Code - Day 9
// Date: 14/12/2024

// Function to find the positions and count of '.' in the diskmap
function findDots(diskmap) {
    const dots = [];
    let startIndex = -1;
    let length = 0;

    for (let i = 0; i < diskmap.length; i++) {
        if (diskmap[i] === '.') {
            if (startIndex === -1) {
                startIndex = i;
            }
            length++;
        } else if (startIndex !== -1) {
            dots.push({ startIndex, length });
            startIndex = -1;
            length = 0;
        }
    }

    if (startIndex !== -1) {
        dots.push({ startIndex, length });
    }

    return dots;
}

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    const inputArray = input.split('\n').map(line => line.split('').map(Number));
    const transformedArray = inputArray.flat().map(num => num.toString().split('').map(Number)).flat();
    const diskmap = [];
    let counter = 0;
    let value = 0
    const numberMoved = []
    let length = 1;

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

    const arrDots = findDots(diskmap);

    for (let i = diskmap.length - 1; i >= 0; i--) {
        length = 1;
        if (arrDots.find(dot => dot.startIndex < i) && diskmap[i] !== '.') {
            let counter = i - 1;
            while (diskmap[i] === diskmap[counter]) {
                length++;
                counter--;
            }
            const dotVal = arrDots.find(dot => dot.length >= length && dot.startIndex < i);
            if (dotVal) {
                diskmap.splice(dotVal.startIndex, length, ...Array(length).fill(diskmap[i]));
                diskmap.splice(i - (length - 1), length, ...Array(length).fill('.'));
                numberMoved.push(diskmap[i]);
                const dotIndex = arrDots.findIndex(dot => dot.startIndex === dotVal.startIndex);
                if (dotIndex !== -1) {
                    arrDots[dotIndex].startIndex += length;
                    arrDots[dotIndex].length -= length;
                    if (arrDots[dotIndex].length <= 0) {
                        arrDots.splice(dotIndex, 1);
                    }
                }
            }
            i = counter + 1;
        }
    }

    for (const index in diskmap) {
        value += diskmap[index] === '.' ? 0 : diskmap[index] * index;
    }

    return value;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);