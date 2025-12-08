import { readFileSync } from "fs";

// Advent of Code - Day 5 - Part 2
// Date: 08/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
  const rows = input.split("\n");
  let ranges = [];

  // Parse all ranges from the input
  for (const element of rows) {
    if (element.includes("-")) {
      const [start, end] = element.split("-").map(Number);
      ranges.push({ start, end });
    }
  }

  // If there are no ranges, return 0
  if (ranges.length === 0) {
    return 0;
  }

  // Sort ranges by their start value
  ranges.sort((a, b) => a.start - b.start);

  let mergedRanges = [];
  let currentMergedRange = { ...ranges[0] }; // Start with the first range

  for (let i = 1; i < ranges.length; i++) {
    const nextRange = ranges[i];

    // Check for overlap or contiguity (e.g., [1,2] and [3,4] should merge to [1,4])
    // The '+ 1' allows merging of adjacent ranges like 5-7 and 8-10 into 5-10
    if (nextRange.start <= currentMergedRange.end + 1) {
      // Merge: extend the current merged range's end if the next range goes further
      currentMergedRange.end = Math.max(currentMergedRange.end, nextRange.end);
    } else {
      // No overlap, add the current merged range to the list and start a new one
      mergedRanges.push(currentMergedRange);
      currentMergedRange = { ...nextRange };
    }
  }
  // Add the last currentMergedRange to the list
  mergedRanges.push(currentMergedRange);

  // Calculate the total count of fresh IDs from the merged ranges
  let totalFreshIDs = 0;
  for (const range of mergedRanges) {
    totalFreshIDs += range.end - range.start + 1;
  }

  return totalFreshIDs;
}

// Read input from file or standard input
const input = readFileSync("input.txt", "utf8").trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);
