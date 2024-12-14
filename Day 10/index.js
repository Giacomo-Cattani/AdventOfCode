import { readFileSync } from 'fs';

// Advent of Code - Day 10
// Date: 14/12/2024

function recursivePath(cord, map, visited, uniquePaths) {
    const directions = [
        [-1, 0], // top
        [1, 0],  // bottom
        [0, -1], // left
        [0, 1]   // right
    ];

    for (let i = 0; i < directions.length; i++) {
        const direction = directions[i];
        const newCord = [cord[0] + direction[0], cord[1] + direction[1]];
        if (
            newCord[0] >= 0 && newCord[0] < map.length &&
            newCord[1] >= 0 && newCord[1] < map[0].length &&
            map[newCord[0]][newCord[1]] === map[cord[0]][cord[1]] + 1 &&
            !visited[newCord[0]][newCord[1]]
        ) {
            visited[newCord[0]][newCord[1]] = true;
            if (map[newCord[0]][newCord[1]] === 9) {
                uniquePaths.add(newCord.toString());
            } else {
                recursivePath(newCord, map, visited, uniquePaths);
            }
            visited[newCord[0]][newCord[1]] = false;
        }
    }
}

// Function to solve the puzzle
function solvePuzzle(input) {
    const map = input.replace(/\r/g, '').split('\n').map(line => line.split('').map(Number));
    let totalScore = 0;

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] === 0) {
                const visited = Array.from({ length: map.length }, () => Array(map[0].length).fill(false));
                const uniquePaths = new Set();
                visited[row][col] = true;
                recursivePath([row, col], map, visited, uniquePaths);
                totalScore += uniquePaths.size;
            }
        }
    }

    return totalScore;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);
