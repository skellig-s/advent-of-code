import { processLineByLine } from '../../tools/tasks';
import { BaseSolution } from '../../tools/interfaces';

class Solution extends BaseSolution {
    fuelCache: {[key: number]: number} = {};

    constructor() {
        super(7);
    }

    async solveFirstTask(): Promise<number> {
        let data: number[] = (await processLineByLine())[0].split(',').map(x => +x);
        let repetitions: number[] = [];
        data.forEach(x => isNaN(repetitions[x]) ? repetitions[x] = 1 : repetitions[x]++);

        let cumulative = 0;
        let optimalPosition = 0;

        for (let i = 0; i < repetitions.length; i++) {
            if (isNaN(repetitions[i])) {
                continue;
            }

            cumulative += repetitions[i];
            if (cumulative >= Math.ceil(data.length / 2)) {
                optimalPosition = i;
                break;
            }
        }

        let result = data.reduce((accumulator, value) => accumulator + Math.abs(value - optimalPosition), 0)

        console.log('part 1 answer:', result);
        return result;
    }

    async solveSecondTask(): Promise<number> {
        let data: number[] = (await processLineByLine())[0].split(',').map(x => +x);
        const mean = data.reduce((accumulator, current) => accumulator + current, 0) / data.length;
        const meanCeil = Math.ceil(mean);
        const meanFloor = Math.floor(mean);

        let result = Math.min(
            data.reduce((accumulator, value) => accumulator + this.countFuel(value, meanCeil), 0),
            data.reduce((accumulator, value) => accumulator + this.countFuel(value, meanFloor), 0)
        );

        console.log('part 2 answer:', result);
        return result;
    }

    countFuel(start: number, end: number): number {
        const delta = Math.abs(start - end);
        if (this.fuelCache[delta]) {
            console.log('cache');
            return this.fuelCache[delta];
        }
        let result = 0;
        for (let i = 0; i <= delta; i++) {
            result += i;
        }
        this.fuelCache[delta] = result;
        return result;
    }
}

const solution = new Solution();
solution.solveFirstTask();
solution.solveSecondTask();