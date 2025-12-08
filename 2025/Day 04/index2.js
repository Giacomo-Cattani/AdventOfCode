import { readFileSync } from "fs";

// Advent of Code - Day 4 - Part 2
// Date: 08/12/2024

// Function to find all accessible paper rolls in current grid
function findAccessibleRolls(grid) {
  const accessible = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      // Check if this position has a paper roll (@)
      if (grid[row][col] === "@") {
        // Count adjacent paper rolls in the 8 surrounding positions
        let adjacentCount = 0;

        // Check all 8 adjacent positions
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue; // Skip the center position

            const newRow = row + dr;
            const newCol = col + dc;

            // Check bounds
            if (
              newRow >= 0 &&
              newRow < grid.length &&
              newCol >= 0 &&
              newCol < grid[newRow].length
            ) {
              if (grid[newRow][newCol] === "@") {
                adjacentCount++;
              }
            }
          }
        }

        // If fewer than 4 adjacent paper rolls, it's accessible
        if (adjacentCount < 4) {
          accessible.push({ row, col });
        }
      }
    }
  }

  return accessible;
}

// Function to solve the puzzle
function solvePuzzle(input) {
  const grid = input.split("\n").map((line) => line.split(""));

  let totalRemoved = 0;

  // Keep removing accessible papers until none are left
  while (true) {
    const accessible = findAccessibleRolls(grid);

    if (accessible.length === 0) {
      break; // No more accessible papers
    }

    // Remove all accessible papers found in this iteration
    for (const { row, col } of accessible) {
      grid[row][col] = ".";
      totalRemoved++;
    }
  }

  return totalRemoved;
}

// Read input from file or standard input
const input = readFileSync("input.txt", "utf8").trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);
