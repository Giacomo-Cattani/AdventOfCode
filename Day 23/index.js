import { readFileSync } from 'fs';

// Advent of Code - Day 23
// Date: 23/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    const connections = input.split('\n').map(connection => connection.replace('\r', ''));
    const lan = new Set();

    for (let i = 0; i < connections.length; i++) {
        const [a, b] = connections[i].split('-');
        for (let j = i + 1; j < connections.length; j++) {
            const [c, d] = connections[j].split('-');
            if (a === c || a === d || b === c || b === d) {
                for (let k = j + 1; k < connections.length; k++) {
                    const [e, f] = connections[k].split('-');
                    if ((a === e || a === f || b === e || b === f) && (c === e || c === f || d === e || d === f)) {
                        const uniqueConnections = new Set([a, b, c, d, e, f]);
                        if (uniqueConnections.size === 3) {
                            const [x, y, z] = uniqueConnections;
                            lan.add({ a: x, b: y, c: z });
                        }
                    }
                }
            }
        }
    }

    const filteredLan = Array.from(lan).filter(obj => {
        for (const key in obj) {
            if (obj[key].toString().startsWith('t')) {
                return true;
            }
        }
        return false;
    });

    return filteredLan.length;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);