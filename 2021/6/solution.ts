import { processLineByLine } from '../../tools/tasks';
import { BaseSolution } from '../../tools/interfaces';

class Solution extends BaseSolution {
    static DAYS_TO_COUNT_1 = 80;
    static DAYS_TO_COUNT_2 = 256;

    fishData: number[];
    
    constructor() {
        super(6);
    }

    async solveFirstTask(): Promise<number> {
        this.fishData = (await processLineByLine())[0]
            .split(',')
            .map(value => +value);

        for (let day = 0; day < Solution.DAYS_TO_COUNT_1; day++) {
            let extra: number[] = [];
            for (let i = 0; i < this.fishData.length; i++) {
                if (this.fishData[i] === 0) {
                    this.fishData[i] = 6;
                    extra.push(8);
                } else {
                    --this.fishData[i];
                }
            }
            this.fishData.push(...extra);
        }

        const result = this.fishData.length;
        console.log('part 1 answer:', result);
        return result;
    }

    async solveSecondTask(): Promise<number> {
        const fish = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
        };
        (await processLineByLine())[0]
            .split(',')
            .forEach(value => fish[+value]++);

        for (let day = 0; day < Solution.DAYS_TO_COUNT_2; day++) {
            const newFish = fish[0];
            for (let lifespan = 1; lifespan <= 8; lifespan++) {
                fish[lifespan - 1] = fish[lifespan];
            }
            fish[6] += newFish;
            fish[8] = newFish;
        }

        const result = Object.keys(fish).reduce((total, lifespan) => total + fish[lifespan], 0);

        console.log('part 2 answer:', result);
        return result;
    }
}

const solution = new Solution();
solution.solveFirstTask();
solution.solveSecondTask();