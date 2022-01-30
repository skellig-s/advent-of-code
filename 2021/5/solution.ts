import { processLineByLine } from '../../tools/tasks';
import { BaseSolution } from '../../tools/interfaces';

interface Coordinates {
    x: number;
    y: number;
}

class Solution extends BaseSolution {
    startPositions: Coordinates[] = [];
    endPositions: Coordinates[] = [];
    field: number[][] = [];

    constructor() {
        super(5);
    }

    async solveFirstTask(): Promise<number> {
        (await processLineByLine()).forEach((line: string) => {
            let arr = Array.from(line.match(/(\d+)/g));
            this.startPositions.push({x: +arr[0], y: +arr[1]});
            this.endPositions.push({x: +arr[2], y: +arr[3]});
        })

        for (let i = 0; i < this.startPositions.length; i++) {
            if (this.startPositions[i].x === this.endPositions[i].x) {
                let max = Math.max(this.startPositions[i].y, this.endPositions[i].y);
                let min = Math.min(this.startPositions[i].y, this.endPositions[i].y);
                if (!this.field[this.startPositions[i].x]) {
                    this.field[this.startPositions[i].x] = []
                }
                for (let j = min; j <= max; j++) {
                    this.field[this.startPositions[i].x][j] = this.field[this.startPositions[i].x][j]
                    ? this.field[this.startPositions[i].x][j] + 1
                    : 1;
                }
            }
            if (this.startPositions[i].y === this.endPositions[i].y) {
                let max = Math.max(this.startPositions[i].x, this.endPositions[i].x);
                let min = Math.min(this.startPositions[i].x, this.endPositions[i].x);
                for (let j = min; j <= max; j++) {
                    if (!this.field[j]) {
                        this.field[j] = []
                    }
                    this.field[j][this.startPositions[i].y] = this.field[j][this.startPositions[i].y]
                        ? this.field[j][this.startPositions[i].y] + 1
                        : 1;
                }
            }
        }

        let result = 0;
        this.field.forEach(row => {
            row.forEach(coordinate => {
                if (coordinate > 1) {
                    result++;
                }
            })
        })

        console.log('part 1 answer:', result);
        return result;
    }

    async solveSecondTask(): Promise<number> {
        for (let i = 0; i < this.startPositions.length; i++) {
            if (this.startPositions[i].x !== this.endPositions[i].x && this.startPositions[i].y !== this.endPositions[i].y) {
                let maxY = Math.max(this.startPositions[i].y, this.endPositions[i].y);
                let minY = Math.min(this.startPositions[i].y, this.endPositions[i].y);
                let minX = Math.min(this.startPositions[i].x, this.endPositions[i].x);
                const signX = Math.sign(this.endPositions[i].x - this.startPositions[i].x);
                const signY = Math.sign(this.endPositions[i].y - this.startPositions[i].y);

                for (let increment = 0; increment <= maxY - minY; increment++) {
                    if (!this.field[this.startPositions[i].x + increment * signX]) {
                        this.field[this.startPositions[i].x + increment * signX] = []
                    }
                    this.field[this.startPositions[i].x + increment * signX][this.startPositions[i].y + increment * signY] = this.field[this.startPositions[i].x + increment * signX][this.startPositions[i].y + increment * signY]
                        ? this.field[this.startPositions[i].x + increment * signX][this.startPositions[i].y + increment * signY] + 1
                        : 1;
                }
            }
        }

        let result = 0;
        this.field.forEach(row => {
            row.forEach(coordinate => {
                if (coordinate > 1) {
                    result++;
                }
            })
        })

        console.log('part 2 answer:', result);
        return result;
    }
}

const solution = new Solution();
solution.solveFirstTask().then(_ => solution.solveSecondTask());
