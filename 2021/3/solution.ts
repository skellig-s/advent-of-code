import { processLineByLine } from '../../tools/tasks';
import { BaseSolution } from '../../tools/interfaces';

enum Bits {
    zero = '0',
    one = '1',
}

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

        const result = Solution.binaryToDecimal(gammaRate.join('')) * Solution.binaryToDecimal(epsilon.join(''));

        console.log('part 1 answer:', result);
        return result;
    }

    async solveSecondTask(): Promise<number> {
        const arrayOfBinary: String[] = await processLineByLine();

        let oxygen = Solution.findBinaryByCriteria(arrayOfBinary, true);
        let scrubber = Solution.findBinaryByCriteria(arrayOfBinary, false);

        const result = Solution.binaryToDecimal(oxygen) * Solution.binaryToDecimal(scrubber);

        console.log('part 2 answer:', result);
        return result;
    }

    private static findBinaryByCriteria(input: String[], criteria: boolean, position = 0): String {
        if (position >= input[0].length) {
            throw 'No binary according to criteria!';
        }

        const mostCommonBit = Solution.getMostCommonBit(input, position);
        const lookBit: Bits = criteria ? mostCommonBit : (+!(+mostCommonBit)).toString() as Bits;

        const filteredInput = input.filter(binary => binary.charAt(position) === lookBit);
        return filteredInput.length === 1
            ? filteredInput[0]
            : Solution.findBinaryByCriteria(filteredInput, criteria, ++position);
    }

    private static getMostCommonBit(input: String[], position = 0): Bits {
        let decision = 1; // If they're equal, choose Bits.one as more common
        input.forEach((bit) => +bit.charAt(position) > 0 ? decision++ : decision--);
        return decision > 0 ? Bits.one : Bits.zero;
    }

    private static binaryToDecimal(bin: String): number {
        return eval(`0b${bin}`);
    }
}

const solution = new Solution();
solution.solveFirstTask();
solution.solveSecondTask();