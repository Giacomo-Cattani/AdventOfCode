import { readFileSync } from "fs";

// Advent of Code - Day 1 - Part 2
// Date: 02/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
  let dialPosition = 50;
  let count = 0;

  const rows = input.split("\n");

  for (const rotation of rows) {
    const direction = rotation.charAt(0) === "L" ? -1 : 1;
    const distance = Number(rotation.substring(1));

    // Simulates every click of the rotation
    for (let i = 0; i < distance; i++) {
      dialPosition = (dialPosition + direction + 100) % 100;

      // Count every time we get to 0
      if (dialPosition === 0) {
        count++;
      }
    }
  }

  return count;
}

// Read input from file or standard input
const input = readFileSync("input.txt", "utf8").trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);
