import { readFileSync } from "fs";

// Advent of Code - Day 2
// Date: 02/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
  // Your code here
  const ranges = input.split(",");
  let result = 0;
  for (const range of ranges) {
    const splittedRange = range.split("-").map(Number);
    for (let i = splittedRange[0]; i <= splittedRange[1]; i++) {
      const calculations = isEven(i);
      if (calculations[0]) {
        const str = i.toString();
        const prima_parte = parseInt(str.substring(0, calculations[1] / 2));
        const seconda_parte = parseInt(str.substring(calculations[1] / 2));
        if (prima_parte == seconda_parte) result += Number(i);
      }
    }
  }
  return result;
}

function isEven(number) {
  const value = number.toString().length;
  return [value % 2 !== 1, value];
}

// Read input from file or standard input
const input = readFileSync("input.txt", "utf8").trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);
