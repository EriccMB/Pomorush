
import { TaskModel } from '../models/TaskModel';

// Define os parâmetros esperados pela função
export type SortTasksOptions = {
  tasks: TaskModel[]; // Lista de tarefas que será ordenada
  direction?: 'asc' | 'desc'; // Direção da ordenação: crescente ou decrescente (opcional)
  field?: keyof TaskModel; // Qual campo da tarefa será usado para ordenar (opcional)
};

export function sortTasks({
  field = 'startDate', // Se o campo não for informado, usamos 'startDate' como padrão
  direction = 'desc', // Se a direção não for informada, usamos 'desc' (decrescente)
  tasks = [], // Se nenhuma lista for passada, usamos uma lista vazia
}: SortTasksOptions): TaskModel[] {
  return [...tasks].sort((a, b) => {
    // Pegamos o valor da propriedade escolhida (ex: startDate) em cada tarefa
    const aValue = a[field];
    const bValue = b[field];

    // --- TRATANDO VALORES NULOS ---

    if (aValue === null && bValue === null) return 0;

    if (aValue === null) return 1;

    if (bValue === null) return -1;

    // --- COMPARAÇÃO NUMÉRICA ---

    // Se os dois valores forem números, fazemos uma subtração para ordenar
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction === 'asc'
        ? aValue - bValue // Ex: 1, 2, 3...
        : bValue - aValue; // Ex: 3, 2, 1...
    }

    // --- COMPARAÇÃO DE STRINGS ---

    // Se os dois valores forem textos, usamos localeCompare para comparar em ordem alfabética
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return direction === 'asc'
        ? aValue.localeCompare(bValue) // A -> Z
        : bValue.localeCompare(aValue); // Z -> A
    }

    // --- CASOS NÃO TRATADOS ---

    // Se não for nem número, nem string, nem null, não alteramos a ordem
    return 0;
  });
}
