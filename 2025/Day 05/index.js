import { readFileSync } from "fs";

// Advent of Code - Day 5
// Date: 08/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
  // Your code here
  const rows = input.split("\n");
  const ranges = [];
  let countFresh = 0;

  for (const element of rows) {
    if (element.includes("-")) {
      const tempRanges = element.split("-");
      ranges.push(...tempRanges.map(Number));
    } else if (element !== "\r") {
      for (let i = 0; i < ranges.length; i += 2) {
        if (Number(element) >= ranges[i] && Number(element) <= ranges[i + 1]) {
          countFresh++;
          break;
        }
      }
    }
  }

  return countFresh;
}

// Read input from file or standard input
const input = readFileSync("input.txt", "utf8").trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);
