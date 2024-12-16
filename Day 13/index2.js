import { readFileSync } from 'fs';

// Advent of Code - Day 13
// Date: 16/12/2024

const cost = { 'a': 3, 'b': 1 };
const SUM = 10000000000000;

function findCheapest(buttonA, buttonB, prize) {
    const numA = (buttonB.y * prize.x - buttonB.x * prize.y);
    const denA = (buttonA.x * buttonB.y - buttonA.y * buttonB.x);

    const n_A = Math.round(numA / denA);
    const n_B = Math.round((prize.x - (buttonA.x * n_A)) / buttonB.x);

    if (buttonA.x * n_A + buttonB.x * n_B !== prize.x || buttonA.y * n_A + buttonB.y * n_B !== prize.y) {
        return { n_A: 0, n_B: 0, totalCost: 0 };
    }
    const totalCost = (cost.a * n_A) + (cost.b * n_B);

    return { n_A, n_B, totalCost };
}

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    const parseInput = (input) => {
        const sections = input.split(/\n\s*\n/);
        return sections.map(section => {
            const lines = section.split('\n');
            const buttonA = lines[0].match(/X\+(\d+), Y\+(\d+)/).slice(1, 3).map(Number);
            const buttonB = lines[1].match(/X\+(\d+), Y\+(\d+)/).slice(1, 3).map(Number);
            let prize = lines[2].match(/X=(\d+), Y=(\d+)/).slice(1, 3).map(Number);
            prize = { x: prize[0] + SUM, y: prize[1] + SUM };
            return {
                buttonA: { x: buttonA[0], y: buttonA[1] },
                buttonB: { x: buttonB[0], y: buttonB[1] },
                prize: prize
            };
        });
    };

    const parsedInput = parseInput(input);
    let totalCost = 0;
    for (const { buttonA, buttonB, prize } of parsedInput) {
        const result = findCheapest(buttonA, buttonB, prize);
        totalCost += result.totalCost;
    }


    return totalCost;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);