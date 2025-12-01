import { readFileSync } from "fs";

// Advent of Code - Day 1
// Date: 01/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
  // Your code here
  let startNumber = 50;
  let count = 0;

  const rows = input.split("\n");

  for (const rotations of rows) {
    let value = Number(rotations.substring(1)) % 100;
    if (rotations.includes("L")) {
      startNumber -= value;
      if (startNumber < 0) {
        startNumber += 100;
      }
    } else {
      startNumber += value;
      if (startNumber > 99) {
        startNumber -= 100;
      }
    }

    if (startNumber == 0) {
      count++;
    }
  }

  return count;
}

// Read input from file or standard input
const input = readFileSync("input.txt", "utf8").trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);
