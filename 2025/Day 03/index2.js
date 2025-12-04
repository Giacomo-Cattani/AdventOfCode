import { readFileSync } from "fs";

// Advent of Code - Day 3 - Part 2
// Date: 03/12/2024

function solvePuzzle(input) {
  const banks = input.split("\n");
  let totalOutputJoltage = 0n;

  for (const bank of banks) {
    totalOutputJoltage += BigInt(findLargest12Digits(bank.trim()));
  }

  return totalOutputJoltage;
}

function findLargest12Digits(bank) {
  const digits = bank.split("");
  const result = [];
  let toRemove = digits.length - 12; // digits to remove

  let currentPos = 0;
  while (result.length < 12) {
    // Find the largest digit within the searchable range
    // We need to leave enough digits after this position to complete the selection
    const digitsNeeded = 12 - result.length;
    const maxSearchPos = digits.length - digitsNeeded;

    let maxIdx = currentPos;
    for (let j = currentPos; j <= maxSearchPos; j++) {
      if (digits[j] > digits[maxIdx]) {
        maxIdx = j;
      }
    }

    result.push(digits[maxIdx]);
    currentPos = maxIdx + 1;
  }

  return result.join("");
}

const input = readFileSync("input.txt", "utf8").trim();
const result = solvePuzzle(input);
console.log(result.toString());
