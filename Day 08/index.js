import { readFileSync } from 'fs';

// Advent of Code - Day 8
// Date: 12/12/2024

// Function to solve the puzzle
function find(grid, antennaType) {
    const positions = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === antennaType) {
                positions.push([i, j]);
            }
        }
    }
    return positions;
}

function isInside(grid, position) {
    return position[0] >= 0 && position[0] < grid.length && position[1] >= 0 && position[1] < grid[0].length;
}

function solvePuzzle(input) {
    // Your code here

    // Convert input into a grid
    const grid = input.split('\n').map(line => line.replace('\r', '').split(''));
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;
    const newAntennas = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] != '.') {
                const antenna = grid[i][j];
                const positions = find(grid, antenna);
                for (let i = 0; i < positions.length; i++) {
                    for (let j = 0; j < positions.length; j++) {
                        if (i != j) {
                            const distance = [];
                            distance.push([Math.abs(positions[i][0] - positions[j][0]), Math.abs(positions[i][1] - positions[j][1])]);
                            const newAntenna = []
                            if (positions[i][0] === positions[j][0]) {
                                // Same row
                                if (positions[i][1] < positions[j][1]) {
                                    newAntenna.push([positions[i][0], positions[i][1] - distance[0][1]]);
                                    newAntenna.push([positions[j][0], positions[j][1] + distance[0][1]]);
                                } else {
                                    newAntenna.push([positions[i][0], positions[i][1] + distance[0][1]]);
                                    newAntenna.push([positions[j][0], positions[j][1] - distance[0][1]]);
                                }
                            } else if (positions[i][1] === positions[j][1]) {
                                // Same column
                                if (positions[i][0] < positions[j][0]) {
                                    newAntenna.push([positions[i][0] - distance[0][0], positions[i][1]]);
                                    newAntenna.push([positions[j][0] + distance[0][0], positions[j][1]]);
                                } else {
                                    newAntenna.push([positions[i][0] + distance[0][0], positions[i][1]]);
                                    newAntenna.push([positions[j][0] - distance[0][0], positions[j][1]]);
                                }
                            } else {
                                // Diagonal
                                if (positions[i][0] < positions[j][0] && positions[i][1] < positions[j][1]) {
                                    newAntenna.push([positions[i][0] - distance[0][0], positions[i][1] - distance[0][1]]);
                                    newAntenna.push([positions[j][0] + distance[0][0], positions[j][1] + distance[0][1]]);
                                } else if (positions[i][0] < positions[j][0] && positions[i][1] > positions[j][1]) {
                                    newAntenna.push([positions[i][0] - distance[0][0], positions[i][1] + distance[0][1]]);
                                    newAntenna.push([positions[j][0] + distance[0][0], positions[j][1] - distance[0][1]]);
                                } else if (positions[i][0] > positions[j][0] && positions[i][1] < positions[j][1]) {
                                    newAntenna.push([positions[i][0] + distance[0][0], positions[i][1] - distance[0][1]]);
                                    newAntenna.push([positions[j][0] - distance[0][0], positions[j][1] + distance[0][1]]);
                                } else {
                                    newAntenna.push([positions[i][0] + distance[0][0], positions[i][1] + distance[0][1]]);
                                    newAntenna.push([positions[j][0] - distance[0][0], positions[j][1] - distance[0][1]]);
                                }
                            }
                            newAntenna.forEach(element => {
                                if (isInside(grid, element) && !newAntennas.find(antenna => antenna[0] === element[0] && antenna[1] === element[1])) {
                                    count++;
                                    newAntennas.push(element);
                                }
                            });
                        }
                    }
                }
            }
        }
    }

    return count;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);