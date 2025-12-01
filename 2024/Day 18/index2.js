import { readFileSync } from 'fs';

// Advent of Code - Day 18
// Date: 18/12/2024

const ROW = 71
const COL = 71

function dijkstra(grid, start, end) {
    const rows = grid.length;
    const cols = grid[0].length;

    // Directions for moving up, down, left, and right
    const directions = [
        [0, 1],  // right
        [1, 0],  // down
        [0, -1], // left
        [-1, 0]  // up
    ];

    // Priority queue (min-heap) to store [distance, x, y]
    const priorityQueue = [[0, start[0], start[1]]];

    // Distance matrix initialized to Infinity
    const distance = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    distance[start[0]][start[1]] = 0;

    while (priorityQueue.length > 0) {
        // Extract the cell with the smallest distance
        priorityQueue.sort((a, b) => a[0] - b[0]); // Sort by distance
        const [dist, x, y] = priorityQueue.shift();

        // If we've reached the destination, return the distance
        if (x === end[0] && y === end[1]) {
            return dist;
        }

        // Check all neighboring cells
        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            // Ensure we're within bounds and not on a corrupted cell
            if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && grid[nx][ny] === '.') {
                const newDist = dist + 1;

                // If a shorter path to (nx, ny) is found, update the distance and push to queue
                if (newDist < distance[nx][ny]) {
                    distance[nx][ny] = newDist;
                    priorityQueue.push([newDist, nx, ny]);
                }
            }
        }
    }

    // If we exit the loop without reaching the end, there's no valid path
    return -1;
}

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    let BYTES = 0;
    let result = 0;
    do {
        BYTES++;
        const grid = Array.from({ length: ROW }, () => Array(COL).fill('.'));
        input.split('\n').slice(0, BYTES).forEach(line => {
            const [y, x] = line.split(',').map(Number);
            grid[x][y] = '#';
        });
        result = dijkstra(grid, [0, 0], [ROW - 1, COL - 1]);
    } while (result !== -1);

    return input.split('\n')[BYTES - 1];
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);