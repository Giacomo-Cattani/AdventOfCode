import { readFileSync } from 'fs';

// Function to solve the puzzle
function solvePuzzle(input) {
    const directions = [
        [0, 1],  // east
        [-1, 0], // north
        [0, -1], // west
        [1, 0],  // south
    ];
    const directionNames = ["east", "north", "west", "south"];

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

        // Store all optimal paths
        const optimalPaths = [];
        let minCost = Infinity;

        // Initialize the starting position and direction
        const [startX, startY] = start;
        const [endX, endY] = end;
        distances[startX][startY]["east"] = 0; // Start facing east
        enqueue({ x: startX, y: startY, dir: "east", path: [[startX, startY]] }, 0);

        while (queue.length > 0) {
            const { node, cost } = dequeue();
            const { x, y, dir, path } = node;

            // If we've already exceeded the minimum cost found, skip this branch
            if (cost > minCost) continue;

            // If we've reached the endpoint
            if (x === endX && y === endY) {
                if (cost < minCost) {
                    // Found a new minimum cost: reset the list of optimal paths
                    minCost = cost;
                    optimalPaths.length = 0;
                }
                // Add this path to the list of optimal paths
                optimalPaths.push(path);
                continue;
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
                    if (newCost <= distances[nx][ny][newDir]) {
                        distances[nx][ny][newDir] = newCost;
                        enqueue({ x: nx, y: ny, dir: newDir, path: [...path, [nx, ny]] }, newCost);
                    }
                }
            }
        }

        // Return all optimal paths
        return { minCost, paths: optimalPaths };
    }

    const maze = parseMaze(input);
    const { start, end } = findStartAndEnd(maze);
    const result = dijkstraMazeWithRotation(maze, start, end);

    // Extract unique nodes from all paths
    const uniqueNodes = new Set();
    result.paths.forEach(path => {
        path.forEach(([x, y]) => {
            uniqueNodes.add(`${x},${y}`); // Use a string representation to avoid duplicates
        });
    });

    // Convert the unique nodes back to coordinate pairs if needed
    const uniqueNodesArray = Array.from(uniqueNodes).map(node => node.split(',').map(Number));

    return { minCost: result.minCost, paths: result.paths, uniqueNodes: uniqueNodesArray };
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log("Unique nodes:", result.uniqueNodes.length);
