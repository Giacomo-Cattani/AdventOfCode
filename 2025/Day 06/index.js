import { readFileSync } from "fs";

// Advent of Code - Day 6
// Date: 09/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
  // Your code here
  const lines = input.split("\n").map((line) => line.trim());
  let result = 0;

  let chars = [];
  for (const element of lines) {
    chars.push(
      element
        .split(" ")
        .filter((c) => c !== "")
        .join(" ")
    );
  }

  for (let i = 0; i < chars[0].split(" ").length; i++) {
    const values = [];
    for (const element of chars) {
      values.push(element.split(" ")[i]);
    }

    const sign = values.pop();
    const expression = values.flatMap((val, i) =>
      i < values.length - 1 ? [val, sign] : [val]
    );

    result += eval(expression.join(" "));
  }

  return result;
}

// Read input from file or standard input
const input = readFileSync("input.txt", "utf8").trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);
