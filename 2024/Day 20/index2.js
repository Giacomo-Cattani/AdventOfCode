import { readFileSync } from 'fs';

// Advent of Code - Day 20
// Date: 20/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
    const map = input.split('\n').map(line => line.replace(/\r/g, '').split(''));
    const rows = map.length;
    const cols = map[0].length;
    const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    let pos = { x: 0, y: 0 };
    let counter = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (map[i][j] === 'S') {
                pos.x = j;
                pos.y = i;
                break;
            }
        }
    }

    let dists = Array.from({ length: rows }, () => Array(cols).fill(-1));
    dists[pos.y][pos.x] = 0;

    while (map[pos.y][pos.x] !== 'E') {
        for (let [x, y] of DIRS) {
            const nx = pos.x + x;
            const ny = pos.y + y;
            if (ny < 0 || nx < 0 || ny >= rows || nx >= cols) continue;
            if (map[ny][nx] === "#") continue;
            if (dists[ny][nx] !== -1) continue;
            dists[ny][nx] = dists[pos.y][pos.x] + 1;
            pos.x = nx;
            pos.y = ny;
        }
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (map[i][j] === '#') continue;
            for (let r = 2; r < 21; r++) {
                for (let dy = 0; dy < r + 1; dy++) {
                    const dx = r - dy;
                    const dirset = new Set([
                        `${i + dy},${j + dx}`,
                        `${i + dy},${j - dx}`,
                        `${i - dy},${j + dx}`,
                        `${i - dy},${j - dx}`
                    ]);
                    for (const dir of dirset) {
                        const [ny, nx] = dir.split(',').map(Number);
                        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
                        if (map[ny][nx] === '#') continue;
                        if ((dists[i][j] - dists[ny][nx]) >= 100 + r) counter++;
                    }
                }
            }
        }
    }

    return counter;
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);