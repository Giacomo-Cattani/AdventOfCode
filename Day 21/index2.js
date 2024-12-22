import { readFileSync } from 'fs';

// Advent of Code - Day 21
// Date: 22/12/2024

const generateNumpadPaths = () => {
    const numpad = {
        7: [0, 0],
        8: [0, 1],
        9: [0, 2],
        4: [1, 0],
        5: [1, 1],
        6: [1, 2],
        1: [2, 0],
        2: [2, 1],
        3: [2, 2],
        0: [3, 1],
        A: [3, 2]
    };
    const numpadPaths = {};
    for (const [a, aPos] of Object.entries(numpad)) {
        numpadPaths[a] = {};
        for (const [b, bPos] of Object.entries(numpad)) {
            if (a === b) {
                numpadPaths[a][b] = [''];
                continue;
            }
            const paths = [];
            for (let i = 0; i < 2; i++) {
                let path = '';
                const dr = bPos[0] > aPos[0] ? 1 : -1;
                const dc = bPos[1] > aPos[1] ? 1 : -1;
                let [r, c] = aPos;
                let isGood = true;
                if (i === 0 && r !== bPos[0]) {
                    while (r !== bPos[0] && isGood) {
                        path += dr === 1 ? 'v' : '^';
                        r += dr;
                        if (r === 3 && c === 0) {
                            isGood = false;
                        }
                    }

                    while (c !== bPos[1] && isGood) {
                        path += dc === 1 ? '>' : '<';
                        c += dc;
                        if (r === 3 && c === 0) {
                            isGood = false;
                        }
                    }
                } else if (i === 1 && c !== bPos[1]) {
                    while (c !== bPos[1] && isGood) {
                        path += dc === 1 ? '>' : '<';
                        c += dc;
                        if (r === 3 && c === 0) {
                            isGood = false;
                        }
                    }

                    while (r !== bPos[0] && isGood) {
                        path += dr === 1 ? 'v' : '^';
                        r += dr;
                        if (r === 3 && c === 0) {
                            isGood = false;
                        }
                    }
                }

                if (isGood && path) {
                    paths.push(path);
                }
            }
            numpadPaths[a][b] = paths;
        }
    }

    return numpadPaths;
};

const generateKeypadPaths = () => {
    const keypad = {
        '^': [0, 1],
        A: [0, 2],
        '<': [1, 0],
        v: [1, 1],
        '>': [1, 2]
    };
    const keypadPaths = {};
    for (const [a, aPos] of Object.entries(keypad)) {
        keypadPaths[a] = {};
        for (const [b, bPos] of Object.entries(keypad)) {
            if (a === b) {
                keypadPaths[a][b] = [''];
                continue;
            }
            const paths = [];
            for (let i = 0; i < 2; i++) {
                let path = '';
                const dr = bPos[0] > aPos[0] ? 1 : -1;
                const dc = bPos[1] > aPos[1] ? 1 : -1;
                let [r, c] = aPos;
                let isGood = true;
                if (i === 0 && r !== bPos[0]) {
                    while (r !== bPos[0] && isGood) {
                        path += dr === 1 ? 'v' : '^';
                        r += dr;
                        if (r === 0 && c === 0) {
                            isGood = false;
                        }
                    }

                    while (c !== bPos[1] && isGood) {
                        path += dc === 1 ? '>' : '<';
                        c += dc;
                        if (r === 0 && c === 0) {
                            isGood = false;
                        }
                    }
                } else if (i === 1 && c !== bPos[1]) {
                    while (c !== bPos[1] && isGood) {
                        path += dc === 1 ? '>' : '<';
                        c += dc;
                        if (r === 0 && c === 0) {
                            isGood = false;
                        }
                    }

                    while (r !== bPos[0] && isGood) {
                        path += dr === 1 ? 'v' : '^';
                        r += dr;
                        if (r === 0 && c === 0) {
                            isGood = false;
                        }
                    }
                }

                if (isGood && path) {
                    paths.push(path);
                }
            }
            keypadPaths[a][b] = paths;
        }
    }

    return keypadPaths;
};

const runPart2 = input => {
    const numpadPaths = generateNumpadPaths();
    const keypadPaths = generateKeypadPaths();

    const cache = {};
    for (let i = 1; i <= 25; i++) {
        cache[i] = {};
    }
    const findShortest = (_code, depth) => {
        if (depth === 0) {
            return _code.length + 1;
        }

        const cached = cache[depth][_code];
        if (cached) {
            return cached;
        }

        const code = `A${_code}A`;
        let total = 0;
        for (let i = 0; i < code.length - 1; i++) {
            const paths = keypadPaths[code[i]][code[i + 1]];
            total += Math.min(...paths.map(p => findShortest(p, depth - 1)));
        }

        cache[depth][_code] = total;

        return total;
    };

    let sum = 0;
    for (const _code of input) {
        const code = `A${_code}`;
        let total = 0;
        for (let i = 0; i < code.length - 1; i++) {
            const paths = numpadPaths[code[i]][code[i + 1]];
            total += Math.min(...paths.map(p => findShortest(p, 25)));
        }

        sum += total * Number(_code.slice(0, 3));
    }

    return sum;
};

const input = readFileSync('input.txt', 'utf8').trim().split('\r\n');

// Solve the puzzle and print the result
const result = runPart2(input);
console.log(result);