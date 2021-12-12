let fs = require('fs');
let path = require('path');
const readline = require('readline');

export async function processLineByLine(path: String = 'input', debug = false): Promise<String[]> {
    const fileStream = fs.createReadStream(path);
    const arr = [];

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        if (debug) {
            console.log(`Line from file: ${line}`);
        }
        arr.push(line);
    }

    return arr;
}

// let bf = fs.readFileSync('input');
// console.log(bf.toString());
