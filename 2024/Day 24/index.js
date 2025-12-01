import { readFileSync } from 'fs';

// Advent of Code - Day 24
// Date: 24/12/2024

function or(v1, v2) {
    if (v1 === '1' || v2 === '1') {
        return '1';
    }
    return '0';
}

function xor(v1, v2) {
    if (v1 !== v2) {
        return '1';
    }
    return '0';
}

function and(v1, v2) {
    if (v1 === '1' && v2 === '1') {
        return '1';
    }
    return '0';
}

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    const sections = input.replace(/\r\n/g, '\n').split('\n\n');

    const values = new Map();

    const firstArray = sections[0].split('\n').reduce((acc, line) => {
        const [key, value] = line.split(':');
        acc[key.trim()] = value.trim();
        return acc;
    }, {});
    for (const [key, value] of Object.entries(firstArray)) {
        values.set(key, value);
    }

    const secondArray = sections[1].split('\n').reduce((acc, line) => {
        const [key, value] = line.split('->');
        const trimmedKey = key.trim();
        const trimmedValue = value.trim();

        if (!acc[trimmedKey]) {
            acc[trimmedKey] = [];
        }
        acc[trimmedKey].push(trimmedValue);

        return acc;
    }, {});
    const uniqueValues = new Set();

    for (const [expression, result] of Object.entries(secondArray)) {
        const [operand1, _operation, operand2] = expression.split(' ');
        uniqueValues.add(operand1);
        uniqueValues.add(operand2);
        result.forEach(r => uniqueValues.add(r));
    }

    const sortedUnique = new Set([...uniqueValues].sort());

    while (values.size < sortedUnique.size) {
        const orderedSecondArray = Object.entries(secondArray).reduce((acc, [key, value]) => {
            const [operand1, _operation, operand2] = key.split(' ');
            if (values.has(operand1) && values.has(operand2)) {
                acc[key] = value;
            }
            return acc;
        }, {});

        for (const [key, value] of Object.entries(orderedSecondArray)) {
            const [operand1, operation, operand2] = key.split(' ');
            let result;
            switch (operation) {
                case 'OR':
                    values.get(operand1);
                    result = or(values.get(operand1), values.get(operand2));
                    value.forEach(v => {
                        if (!values.has(v)) {
                            values.set(v, result);
                        }
                    });
                    break;
                case 'XOR':
                    result = xor(values.get(operand1), values.get(operand2));
                    value.forEach(v => {
                        if (!values.has(v)) {
                            values.set(v, result);
                        }
                    });
                    break;
                case 'AND':
                    result = and(values.get(operand1), values.get(operand2));
                    value.forEach(v => {
                        if (!values.has(v)) {
                            values.set(v, result);
                        }
                    });
                    break;
                default:
                    result = '0';
            }
        }
    }

    for (const key of values.keys()) {
        if (!key.startsWith('z')) {
            values.delete(key);
        }
    }

    const sortedByKey = new Map([...values.entries()].sort((a, b) => b[0].localeCompare(a[0])));

    const resultString = Array.from(sortedByKey.values()).join('');
    const result = parseInt(resultString, 2);

    return result;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);