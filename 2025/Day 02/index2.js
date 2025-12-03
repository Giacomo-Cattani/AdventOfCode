import { readFileSync } from "fs";

// Advent of Code - Day 2 - Part 2
// Date: 03/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
  const ranges = input.split(",");
  let result = 0;
  const invalidIds = new Set();

  for (const range of ranges) {
    const [start, end] = range.split("-").map(Number);

    // Generate all invalid numbers in the range
    const minLen = start.toString().length;
    const maxLen = end.toString().length;

    // For every possible sequence length
    for (let seqLen = 1; seqLen <= maxLen; seqLen++) {
      // For each number of repetitions
      for (let reps = 2; reps <= maxLen / seqLen; reps++) {
        // For every possible sequence of that length
        const targetLen = seqLen * reps;
        if (targetLen < minLen || targetLen > maxLen) continue;

        // Generate invalid numbers of this length
        generateInvalidNumbers(seqLen, reps, start, end, invalidIds);
      }
    }
  }

  // Sum all unique invalid IDs
  for (const id of invalidIds) {
    result += id;
  }

  return result;
}

function generateInvalidNumbers(seqLen, reps, start, end, invalidIds) {
  const totalLen = seqLen * reps;

  // Calculate the minimum and maximum of the sequence
  const minSeq = Math.pow(10, seqLen - 1);
  const maxSeq = Math.pow(10, seqLen) - 1;

  for (let seq = minSeq; seq <= maxSeq; seq++) {
    const seqStr = seq.toString();
    let numStr = "";
    for (let i = 0; i < reps; i++) {
      numStr += seqStr;
    }
    const num = Number(numStr);

    if (num >= start && num <= end) {
      invalidIds.add(num);
    }
  }
}

// Read input from file or standard input
const input = readFileSync("input.txt", "utf8").trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);
