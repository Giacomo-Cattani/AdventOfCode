import { readFileSync, appendFileSync } from "fs";

// Advent of Code - Day 6 - Part 2
// Date: 09/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
  // Your code here
  const lines = input.split("\n").map((str) => str.replace(/\r/g, ""));
  let result = 0;
  let signs = lines[lines.length - 1]
    .split("")
    .map((s) => s.trim())
    .filter((s) => s !== "");
  const array = [];

  for (let i = 0; i < Math.max(...lines.map((line) => line.length)); i++) {
    let values = [];

    for (const element of lines.slice(0, -1)) {
      values.push(element[element.length - 1 - i]);
    }
    array.push(Number(values.join("").replace(/\s/g, "")));
  }
  const splitArray = array.reduce((acc, val) => {
    if (val === 0) {
      acc.push([]);
    } else {
      if (acc.length === 0) acc.push([]);
      acc[acc.length - 1].push(val);
    }
    return acc;
  }, []);

  for (let i = 0; i < splitArray.length; i++) {
    const expression = splitArray[i].flatMap((val, j) =>
      j < splitArray[i].length - 1 ? [val, signs[signs.length - 1 - i]] : [val]
    );
    appendFileSync(`debug_part2_line.txt`, expression.join(" ") + "\n", "utf8");
    result += eval(expression.join(" "));
  }

  return result;
}

// Read input from file or standard input
const input = readFileSync("input.txt", "utf8").trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);
