import { processLineByLine } from '../../tools/tasks';
import { BaseSolution } from '../../tools/interfaces';

interface Board {
    horizontals: Set<number>[],
    verticals: Set<number>[],
}

class Solution extends BaseSolution {
    private static BoardStartingPosition = 2;
    private sequence: number[];
    private boards: Board[] = [];

    constructor() {
        super(4);
    }

    async prepareInput() {
        const wholeFile = (await processLineByLine());
        this.boards = [];
        this.sequence = wholeFile[0].split(',').map(value => +value);
        for (let i = Solution.BoardStartingPosition; i < wholeFile.length; i += 6) {
            let boardNumber = Math.floor((i - Solution.BoardStartingPosition) / 6);
            this.boards.push({
                horizontals: [],
                verticals: (new Array(5)).fill(null).map(_ => new Set()),
            });

            Array.from({length: 5}, (_, index) => {
                const line = [...(wholeFile[i + index].matchAll(/\d+/g))].map(array => +array[0]);
                this.boards[boardNumber].horizontals[index] = new Set(line);
                line.forEach((value, numberInLine) => {
                    this.boards[boardNumber].verticals[numberInLine].add(value)
                })
            });

        }
    }

    private checkBoardFields(boardFields: Set<number>[], lookupNumber: number): boolean {
        for (let i = 0; i < boardFields.length; i++) {
            if (boardFields[i].delete(lookupNumber)) {
                return boardFields[i].size === 0;
            }
        }
        return false;
    }

    /**
     Checks all boards.
     @param lookupNumber - number to check in board
     @return boardIndex of winning board, or 0 if no winner yet
     */
    private checkBoards(lookupNumber: number): number {
        for (let boardIndex = 0; boardIndex < this.boards.length; boardIndex++) {
            let board = this.boards[boardIndex];
            if (
                this.checkBoardFields(board.horizontals, lookupNumber)
                || this.checkBoardFields(board.verticals, lookupNumber)
            ) {
                return boardIndex;
            }
        }
        return 0;
    }

    async solveFirstTask(): Promise<number> {
        await this.prepareInput();
        let finalNumber = 1;
        let winnerBoard = 1;

        for (let i = 0; i < this.sequence.length; i++) {
            let checkResult = this.checkBoards(this.sequence[i]);
            if (checkResult) {
                winnerBoard = checkResult;
                finalNumber = this.sequence[i];
                break;
            }
        }

        let leftNumbers = 0;
        this.boards[winnerBoard].horizontals.forEach(set => set.forEach(value => leftNumbers += value));

        const result = leftNumbers * finalNumber;
        console.log('part 1 answer:', result);
        return result;
    }

    async solveSecondTask(): Promise<number> {
        await this.prepareInput();
        let finalNumber = 1;
        let winnerBoard;

        for (let i = 0; i < this.sequence.length; i++) {
            for (let boardIndex = 0; boardIndex < this.boards.length; boardIndex++) {
                this.boards[boardIndex].horizontals.forEach(set => {
                    set.delete(this.sequence[i]);
                })
                this.boards[boardIndex].verticals.forEach(set => {
                    set.delete(this.sequence[i]);
                })
                if (
                    this.boards[boardIndex].horizontals.some(set => set.size === 0)
                    || this.boards[boardIndex].verticals.some(set => set.size === 0)
                ) {
                    winnerBoard = {...this.boards[boardIndex]};
                    this.boards[boardIndex] = {
                        horizontals: [],
                        verticals: [],
                    };
                    finalNumber = this.sequence[i];
                }
            }
        }

        let leftNumbers = 0;
        winnerBoard.horizontals.forEach(set => set.forEach(value => leftNumbers += value));

        const result = leftNumbers * finalNumber;
        console.log('part 2 answer:', result);
        return result;
    }
}

const solution = new Solution();
solution.solveFirstTask();
solution.solveSecondTask();
