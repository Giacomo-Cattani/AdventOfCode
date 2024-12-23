import { readFileSync } from 'fs';

// Advent of Code - Day 22
// Date: 22/12/2024

const ITERATION = 2000;

function getNextSecret(secret) {
    const MODULO = 16777216;

    // Step 1: Multiply by 64, mix, and prune
    secret ^= (secret * 64) % MODULO;
    secret %= MODULO;

    // Step 2: Divide by 32 (floor), mix, and prune
    secret ^= Math.floor(secret / 32) % MODULO;
    secret %= MODULO;

    // Step 3: Multiply by 2048, mix, and prune
    secret ^= (secret * 2048) % MODULO;
    secret %= MODULO;

    return secret;
}

function runLine(secret, memory) {
    const localMemory = new Map();
    const sequence = [];
    let last = secret % 10;
    for (let i = 0; i < ITERATION; i++) {
        last = secret % 10;
        secret = getNextSecret(secret);
        const curr = secret % 10;
        const diff = curr - last;
        sequence.push(diff);
        if (sequence.length > 4) sequence.shift();

        if (sequence.length === 4) {
            const key = sequence.join(',');
            if (!localMemory.has(key)) {
                localMemory.set(key, true);
                if (!memory.has(key)) memory.set(key, curr)
                else memory.set(key, memory.get(key) + curr);
            }
        }
    }
}

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    let res = 0;
    const memory = new Map();
    const lines = input.replace(/\r/g, '').split('\n').map(Number);

    lines.forEach((line) => {
        runLine(line, memory);
    });

    for (const value of memory.values()) {
        if (value > res) res = value;
    }
    return res;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);