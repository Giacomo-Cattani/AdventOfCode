import { readFileSync } from 'fs';

// Advent of Code - Day 19
// Date: 19/12/2024

function canComposeString(targetString, stringSet) {
    // Create a DP array to track whether substrings can be formed
    const dp = Array(targetString.length + 1).fill(false);
    dp[0] = true; // Base case: empty string can always be formed

    // Iterate through the target string
    for (let i = 1; i <= targetString.length; i++) {
        for (let str of stringSet) {
            const len = str.length;
            if (i >= len && dp[i - len] && targetString.slice(i - len, i) === str) {
                dp[i] = true;
                break; // No need to check further if we already found a match
            }
        }
    }

    // Return whether the entire target string can be formed
    return dp[targetString.length];
}

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    const [patterns, messages] = input.split(/\n\s*\n/).map(section => section.split('\n').map(item => item.trim()));
    const splitPatterns = patterns.flatMap(pattern => pattern.split(', '));
    let result = 0;

    for (const message of messages) {
        const value = canComposeString(message, splitPatterns);
        value ? result++ : null;
    }
    return result;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);