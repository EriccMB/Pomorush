// É COMO CADA ELEMENTO DA TASK É, POR EXEMPLO
// NOME, DURAÇÃO, DATA, TIPO, STATUS...

import { TaskStateModel } from "./TaskStateModel";

export type TaskModel = {
    id: string;
    name: string;
    duration: number;
    startDate: number;
    completeDate: number | null; // QUANDO O TEMPO DA TASK CHEGA AO FINAL
    interruptDate: number | null; // QUANDO A TASK FOR INTERROMPIDA, SERÁ ESSA DATA, SEM O completeDate
    type: keyof TaskStateModel['config'];
}