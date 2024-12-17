import { readFileSync } from 'fs';

// Advent of Code - Day 16
// Date: 16/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
    // Your code here
    const directions = [
        { dx: -1, dy: 0 }, // up
        { dx: 1, dy: 0 },  // down
        { dx: 0, dy: -1 }, // left
        { dx: 0, dy: 1 }   // right
    ];

    function parseMaze(input) {
        return input.split('\n').map(line => line.replace(/\r/g, '').split(''));
    }

    function findStartAndEnd(maze) {
        let start, end;
        for (let i = 0; i < maze.length; i++) {
            for (let j = 0; j < maze[i].length; j++) {
                if (maze[i][j] === 'S') start = [i, j];
                if (maze[i][j] === 'E') end = [i, j];
            }
        }
        return { start, end };
    }

    function dijkstraMazeWithRotation(maze, start, end) {
        const rows = maze.length;
        const cols = maze[0].length;

        // Directions for movement and their corresponding deltas
        const directions = [
            [0, 1],  // east
            [-1, 0], // north
            [0, -1], // west
            [1, 0],  // south
        ];
        const directionNames = ["east", "north", "west", "south"];

        // Helper to check if a position is valid
        function isValid(x, y) {
            return x >= 0 && x < rows && y >= 0 && y < cols && maze[x][y] !== '#';
        }

        // Priority queue implemented using an array
        const queue = [];
        function enqueue(node, cost) {
            queue.push({ node, cost });
            queue.sort((a, b) => a.cost - b.cost); // Sort by cost
        }
        function dequeue() {
            return queue.shift();
        }

        // Distance map to track minimum costs, for each position and direction
        const distances = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => ({
                east: Infinity,
                north: Infinity,
                west: Infinity,
                south: Infinity,
            }))
        );

        // Initialize the starting position and direction
        const [startX, startY] = start;
        const [endX, endY] = end;
        distances[startX][startY]["east"] = 0; // Start facing east
        enqueue({ x: startX, y: startY, dir: "east" }, 0);

        while (queue.length > 0) {
            const { node, cost } = dequeue();
            const { x, y, dir } = node;

            // If we've reached the endpoint, return the cost
            if (x === endX && y === endY) {
                return cost;
            }

            // Get the current direction index
            const dirIndex = directionNames.indexOf(dir);

            // Explore all possible movements (consider turning and moving forward)
            for (let turn = -1; turn <= 1; turn++) {
                // Calculate the new direction after turning
                const newDirIndex = (dirIndex + turn + 4) % 4; // Keep index in range [0, 3]
                const newDir = directionNames[newDirIndex];
                const rotationCost = Math.abs(turn) * 1000; // Turn cost is 1000 per 90-degree rotation

                // Move forward in the new direction
                const [dx, dy] = directions[newDirIndex];
                const nx = x + dx;
                const ny = y + dy;

                if (isValid(nx, ny)) {
                    const newCost = cost + 1 + rotationCost; // Add 1 for step cost and rotation cost

                    // Update the cost if a shorter path is found
                    if (newCost < distances[nx][ny][newDir]) {
                        distances[nx][ny][newDir] = newCost;
                        enqueue({ x: nx, y: ny, dir: newDir }, newCost);
                    }
                }
            }
        }

        // If we exit the loop without reaching the end, no path exists
        return -1;
    }

    const maze = parseMaze(input);
    const { start, end } = findStartAndEnd(maze);
    return dijkstraMazeWithRotation(maze, start, end);
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);