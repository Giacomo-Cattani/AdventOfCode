import { readFileSync } from 'fs';

// Advent of Code - Day 23
// Date: 23/12/2024

// Function to solve the puzzle
function solvePuzzle(input) {
    // Parse the input into a graph representation
    const connections = input.split('\n').map(line => line.replace('\r', '').split('-'));
    const graph = {};

    // Build the graph as an adjacency list
    for (const [a, b] of connections) {
        if (!graph[a]) graph[a] = new Set();
        if (!graph[b]) graph[b] = new Set();
        graph[a].add(b);
        graph[b].add(a);
    }

    // Function to find the largest clique using Bron–Kerbosch algorithm
    function findCliques(r, p, x) {
        if (p.size === 0 && x.size === 0) {
            cliques.push([...r]); // Add the found clique
            return;
        }
        for (const node of [...p]) {
            const neighbors = graph[node] || new Set();
            findCliques(
                new Set([...r, node]),
                new Set([...p].filter(n => neighbors.has(n))),
                new Set([...x].filter(n => neighbors.has(n)))
            );
            p.delete(node);
            x.add(node);
        }
    }

    // Initialize variables for Bron–Kerbosch
    const cliques = [];
    const allNodes = new Set(Object.keys(graph));
    findCliques(new Set(), allNodes, new Set());

    // Find the largest clique
    const largestClique = cliques.reduce((max, clique) => clique.length > max.length ? clique : max, []);

    // Sort the largest clique alphabetically and join with commas
    return largestClique.sort().join(',');
}

// Read input from file or standard input
const input = readFileSync('input.txt', 'utf8').trim();

// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result);
