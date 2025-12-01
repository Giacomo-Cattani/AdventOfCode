import { readFileSync } from 'fs';

// Advent of Code - Day 19
// Date: 19/12/2024

function countCombinations(targetString, stringSet) {
    // Create a DP array to count combinations for substrings
    const dp = Array(targetString.length + 1).fill(0);
    dp[0] = 1; // Base case: empty string has one combination (no strings used)

    // Iterate through the target string
    for (let i = 1; i <= targetString.length; i++) {
        for (let str of stringSet) {
            const len = str.length;
            if (i >= len && targetString.slice(i - len, i) === str) {
                dp[i] += dp[i - len];
            }
        }
    }

    // Return the total combinations for the entire target string
    return dp[targetString.length];
}
// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    const [patterns, messages] = input.split(/\n\s*\n/).map(section => section.split('\n').map(item => item.trim()));
    const splitPatterns = patterns.flatMap(pattern => pattern.split(', '));
    let result = 0;

    for (const message of messages) {
        const value = countCombinations(message, splitPatterns);
        result += value;
    }
    return result;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);