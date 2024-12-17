import { readFileSync } from 'fs';

// Advent of Code - Day 1
// Date: 09/12/2024

const registers = {};

function comboOperand(input) {
    switch (input) {
        case 0:
        case 1:
        case 2:
        case 3:
            return input;
        case 4:
            return registers['A'];
        case 5:
            return registers['B'];
        case 6:
            return registers['C'];
        case 7:
            return false;
    }
}

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    const lines = input.split('\n');
    const program = [];

    lines.forEach(line => {
        if (line.startsWith('Register')) {
            const [register, value] = line.split(': ');
            registers[register.split(' ')[1]] = parseInt(value, 10);
        } else if (line.startsWith('Program')) {
            program.push(...line.split(': ')[1].split(',').map(Number));
        }
    });

    // Example logic to process the program
    const output = [];
    let index = 0;
    while (index < program.length) {
        const instruction = program[index];
        const numAfter = index + 1
        const operand = program[numAfter]
        const convertedOperand = comboOperand(operand);
        switch (instruction) {
            case 0:
                const adv = registers['A'] / Math.pow(2, convertedOperand);
                const truncatedAdv = Math.trunc(adv);
                registers['A'] = truncatedAdv;
                index += 2;
                break;
            case 1:
                const bxl = (registers['B'] ^ operand);
                registers['B'] = bxl;
                index += 2;
                break;
            case 2:
                const bst = convertedOperand % 8;
                registers['B'] = bst;
                index += 2;
                break;
            case 3:
                if (registers['A'] === 0) {
                    index += 2;
                } else {
                    index = operand;
                }
                break;
            case 4:
                const bxc = (registers['B'] ^ registers['C']);
                registers['B'] = bxc;
                index += 2;
                break;
            case 5:
                const out = convertedOperand % 8;
                output.push(out);
                index += 2;
                break;
            case 6:
                const bdv = registers['A'] / Math.pow(2, convertedOperand)
                const truncatedBdv = Math.trunc(bdv);
                registers['B'] = truncatedBdv;
                index += 2;
                break;
            case 7:
                const cdv = registers['A'] / (Math.pow(2, convertedOperand))
                const truncatedCdv = Math.trunc(cdv);
                registers['C'] = truncatedCdv;
                index += 2;
                break;
        }
    }
    return output;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result.join(','));
