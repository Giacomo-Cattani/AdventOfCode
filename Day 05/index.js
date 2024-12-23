import { readFileSync } from 'fs';

// Advent of Code - Day 5
// Date: 10/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
    const [pairs, sequences] = input.split('\n\r').map(section => section.split('\n'));

    const pairsArray = pairs.map(pair => pair.split('|').map(Number));
    const sequencesArray = sequences.map(sequence => sequence.split(',').map(Number)).filter(sequence => !(sequence.length === 1 && sequence[0] === 0));
    let conta = 0;
    for (const key in sequencesArray) {
        let valid = true;
        for (let i = 0; i < sequencesArray[key].length - 1; i++) {
            const element = sequencesArray[key][i];
            if (pairsArray.find((pair) => pair[0] === element && pair[1] === sequencesArray[key][i + 1]) === undefined) {
                valid = false;
                break;
            }
        }
        if (valid) {
            var middle = sequencesArray[key][Math.round((sequencesArray[key].length - 1) / 2)];
            conta += middle;
        }
    }
    return conta;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);