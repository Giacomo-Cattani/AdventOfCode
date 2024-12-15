import { readFileSync } from 'fs';

// Advent of Code - Day 1
// Date: 09/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    var wordCount = input.match(/(\w+)/g).length;
    let arr1 = [];
    let arr2 = [];
    for (var i = 0; i < wordCount; i += 2) {
        arr1.push(input.match(/(\w+)/g)[i]);
        arr2.push(input.match(/(\w+)/g)[i + 1]);
    }

    arr1.sort();
    arr2.sort();

    let length = 0;

    for (var i = 0; i < arr1.length; i++) {
        length += Math.abs(arr1[i] - arr2[i]);
    }

    return length;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);