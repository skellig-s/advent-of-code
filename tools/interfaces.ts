export interface Solvable {
    solveFirstTask(): Promise<any>;
    solveSecondTask(): Promise<any>;
}

export abstract class BaseSolution implements Solvable {
    constructor(taskNumber: number) {
        console.log(`Solving problem #${taskNumber}`);
    }

    abstract solveFirstTask(): Promise<any>;
    abstract solveSecondTask(): Promise<any>;
}