import { processLineByLine } from '../../tools/tasks';
import { BaseSolution } from '../../tools/interfaces';

class Solution extends BaseSolution {
    private numbersAppearances = new Array(12).fill(0);

    constructor() {
        super(3);
    }

    private processBinary(binary: String) {
        for (let i = 0; i < binary.length; i++) {
            +binary[i] > 0 ? this.numbersAppearances[i]++ : this.numbersAppearances[i]--;
        }
    }

    async solveFirstTask(): Promise<number> {
        (await processLineByLine()).forEach((binary) => this.processBinary(binary));
        let gammaRate = [];
        let epsilon = [];

        for (let i = 0; i < this.numbersAppearances.length; i++) {
            if (+this.numbersAppearances[i] > 0) {
                gammaRate.push(1);
                epsilon.push(0) ;
            } else {
                gammaRate.push(0);
                epsilon.push(1) ;
            }
        }

        const result = eval(`0b${gammaRate.join('')}`) * eval(`0b${epsilon.join('')}`);

        console.log('part 1 answer:', result);
        return result;
    }

    async solveSecondTask(): Promise<number> {
        const result = 1;

        console.log('part 2 answer:', result);
        return result;
    }
}

const solution = new Solution();
solution.solveFirstTask();
// solution.solveSecondTask();