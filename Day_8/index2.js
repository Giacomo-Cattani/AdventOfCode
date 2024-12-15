import { readFileSync } from 'fs';

// Advent of Code - Day 8
// Date: 12/12/2024

// Function to solve the puzzle
function find(grid, antennaType) {
    const positions = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === antennaType && !positions.find(position => position[0] === i && position[1] === j)) {
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
    // Convert input into a grid
    const grid = input.split('\n').map(line => line.replace('\r', '').split(''));
    const rows = grid.length;
    const cols = grid[0].length;
    const newAntennas = [];
    const types = [];
    let count = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] != '.') {
                count++;
                if (!types.includes(grid[i][j])) {
                    types.push(grid[i][j]);
                    const antenna = grid[i][j];
                    const positions = find(grid, antenna);
                    for (let k = 0; k < positions.length; k++) {
                        for (let l = k + 1; l < positions.length; l++) {
                            const distance = [positions[l][0] - positions[k][0], positions[l][1] - positions[k][1]];
                            let m = 1;
                            while (true) {
                                const newAntenna1 = [positions[k][0] - m * distance[0], positions[k][1] - m * distance[1]];
                                const newAntenna2 = [positions[l][0] + m * distance[0], positions[l][1] + m * distance[1]];
                                if (!isInside(grid, newAntenna1) && !isInside(grid, newAntenna2)) {
                                    break;
                                }
                                if (isInside(grid, newAntenna1)) {
                                    newAntennas.push(newAntenna1);
                                }
                                if (isInside(grid, newAntenna2)) {
                                    newAntennas.push(newAntenna2);
                                }
                                m++;
                            }
                        }
                    }
                }
            }
        }
    }
    const uniqueNewAntennas = newAntennas
        .filter(antenna => !types.includes(grid[antenna[0]][antenna[1]]))
        .filter((antenna, index, self) =>
            index === self.findIndex(a => a[0] === antenna[0] && a[1] === antenna[1])
        );

    count += uniqueNewAntennas.length;
    return count;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);
