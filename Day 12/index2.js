import { readFileSync } from 'fs';

// Advent of Code - Day 12
// Date: 15/12/2024

const visited = new Set();

function bfs(p, input) {
    let plotArea = 0;

    let edges = new Set();
    let edgeCount = 0;

    const val = input[p[0]][p[1]];

    const queue = [p];

    while (queue.length > 0) {
        const current = queue.shift();
        const key = current.join(',');

        if (visited.has(key)) {
            continue;
        } else {
            visited.add(key);
        }

        plotArea += 1;

        let neighbors = getNeighbors(current);
        for (let polarity = 0; polarity < neighbors.length; polarity++) {
            let neighbor = neighbors[polarity];
            if (!inBounds(neighbor, input) || input[neighbor[0]][neighbor[1]] !== val) {
                edgeCount += 1;

                edges.add(`${polarity},${neighbor[0]},${neighbor[1]}`);

                for (const n2 of getNeighbors(neighbor)) {
                    if (edges.has(`${polarity},${n2[0]},${n2[1]}`)) {
                        edgeCount -= 1;
                    }
                }
            } else {
                queue.push(neighbor);
            }
        }
    }

    const price = plotArea * edgeCount;

    return price;
}

function getNeighbors(point) {
    const [x, y] = point;
    const ns = [];
    for (const vect of [
        [0, -1],
        [0, 1],
        [1, 0],
        [-1, 0],
    ]) {
        let x1 = x + vect[0];
        let y1 = y + vect[1];
        ns.push([x1, y1]);
    }
    return ns;
}

function inBounds(p, input) {
    const [x, y] = p;
    if (x < 0 || y < 0 || x >= input.length || y >= input[0].length) {
        return false;
    }
    return true;
}

// Function to solve the puzzle
function solvePuzzle(input) {
    let total = 0;
    const inputArray = input.split('\r\n');
    for (let i = 0; i < inputArray.length; i++) {
        for (let j = 0; j < inputArray[0].length; j++) {
            if (!visited.has(`${i},${j}`)) {
                total += bfs([i, j], inputArray);
            }
        }
    }
    return total;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);
