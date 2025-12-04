import { readFileSync } from "fs";

// Advent of Code - Day 3
// Date: 03/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
  // Your code here

  const banks = input.split("\n");

  let totalOutputJoltage = 0;

  for (const singleBank of banks) {
    totalOutputJoltage += Number(
      findMax(singleBank.trim(), singleBank.trim().length)
    );
  }

  return totalOutputJoltage;
}

function findMax(singleBank, originalLength) {
  let array = Array.from(singleBank).map(Number);
  let maxValue = Math.max(...array);
  let positionChar = singleBank.indexOf(maxValue);
  if (
    positionChar === singleBank.length - 1 &&
    singleBank.length === originalLength
  ) {
    const tempArr = array.slice(0, -1);
    maxValue = Math.max(...tempArr);
    positionChar = singleBank.indexOf(maxValue);
  }
  if (singleBank.length !== originalLength) return maxValue;
  array = array.slice(positionChar + 1);
  const secondValue = findMax(array, originalLength).toString();
  maxValue += secondValue;

  return maxValue;
}

// Read input from file or standard input
const input = readFileSync("input.txt", "utf8").trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);
