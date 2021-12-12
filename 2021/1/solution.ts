import { processLineByLine } from '../../tools/tasks';
import { Solvable } from '../../tools/interfaces';

class Solution implements Solvable {
    async solveFirstTask(): Promise<number> {
        const inputData = (await processLineByLine()).map(num => +num);
        let result = 0;

        for (let i = 0; i < inputData.length - 1; i++) {
            result += +(inputData[i] < inputData[i + 1]);
        }
        console.log('part 1 answer:', result);
        return result;
    }

    async solveSecondTask(): Promise<number> {
        const inputData = (await processLineByLine()).map(num => +num);
        let result = 0;

        for (let i = 0; i < inputData.length - 3; i++) {
            result += +(inputData[i] < inputData[i + 3]);
        }
        console.log('part 2 answer:', result);
        return result;
    }
}

const solution = new Solution();
solution.solveFirstTask();
solution.solveSecondTask();