import { processLineByLine } from '../../tools/tasks';
import { BaseSolution } from '../../tools/interfaces';

enum SubmarineCommands {
    forward = 'forward',
    up = 'up',
    down = 'down',
}

class Solution extends BaseSolution {
    private horizontal = 0;
    private depth = 0;

    constructor() {
        super(2);
    }

    async solveFirstTask(): Promise<number> {
        (await processLineByLine()).map((commandLine) => {
            const [command, value] = commandLine.split(' ');
            switch (command) {
                case SubmarineCommands.forward:
                    this.horizontal += +value;
                    break;
                case SubmarineCommands.down:
                    this.depth += +value;
                    break;
                case SubmarineCommands.up:
                    if (this.depth - +value >=0 ) {
                        this.depth -= +value;
                    }
                    break;
            }
            return commandLine;
        });
        const result = this.horizontal * this.depth;

        console.log('part 1 answer:', result);
        return result;
    }

    async solveSecondTask(): Promise<number> {
        let horizontal = 0, depth = 0, aim = 0;
        (await processLineByLine()).map((commandLine) => {
            const [command, value] = commandLine.split(' ');
            switch (command) {
                case SubmarineCommands.forward:
                    horizontal += +value;
                    depth += +value * aim;
                    break;
                case SubmarineCommands.down:
                    aim += +value;
                    break;
                case SubmarineCommands.up:
                    if (aim - +value >=0 ) {
                        aim -= +value;
                    }
                    break;
            }
            return commandLine;
        });
        const result = horizontal * depth;

        console.log('part 2 answer:', result);
        return result;
    }
}

const solution = new Solution();
solution.solveFirstTask();
solution.solveSecondTask();