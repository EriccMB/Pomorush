import { TaskModel } from "./TaskModel"

export type TaskStateModel = {
    tasks: TaskModel[];
    secondsRemaining: number;
    formattedSecondsRemaining: string;
    activeTask: TaskModel | null;
    currentCycle: number; // vai de 1 até 8, se for 8, retorna pro 1
    config: {
        workTime: number;
        shortBreakTime: number;
        longBreakTime: number;
    }
}