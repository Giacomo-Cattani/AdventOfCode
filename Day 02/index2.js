import { readFileSync } from 'fs';

// Advent of Code - Day 2
// Date: 09/12/2024

let error = 0;

function controlNumber(numbers, index1, index2, updateError = true) {
    if (index2 >= numbers.length) {
        return false;
    }
    const level1 = numbers[index1];
    const level2 = numbers[index2];
    const isSafe = Math.abs(level1 - level2) <= 3 && Math.abs(level1 - level2) >= 1;
    if (!isSafe && updateError) {
        error++;
    }
    return isSafe;
}

function isMonotonic(numbers) {
    let increasing = true;
    let decreasing = true;
    for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] < numbers[i + 1]) {
            decreasing = false;
        }
        if (numbers[i] > numbers[i + 1]) {
            increasing = false;
        }
    }
    return increasing || decreasing;
}

function isSafe(numbers) {
    if (!isMonotonic(numbers)) {
        return false;
    }
    error = 0;
    for (let i = 0; i < numbers.length - 1; i++) {
        if (!controlNumber(numbers, i, i + 1)) {
            return false;
        }
    }
    return error === 0;
}

function isSafeWithDampener(numbers) {
    for (let i = 0; i < numbers.length; i++) {
        let modifiedNumbers = numbers.slice(0, i).concat(numbers.slice(i + 1));
        if (isSafe(modifiedNumbers)) {
            return true;
        }
    }
    return false;
}

function solvePuzzle(input) {
    const reports = input.split('\n').map(line => line.split(' ').map(Number));
    let count = 0;

    for (const numbers of reports) {
        if (isSafe(numbers) || isSafeWithDampener(numbers)) {
            count++;
        }
    }

    return count;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);