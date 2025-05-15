import { TaskStateModel } from '../../models/TaskStateModel';
import { formatSecondsRemaining } from '../../utils/formatSecondsToMinutes';
import { getNextCycle } from '../../utils/getNextCycle';
import { initialTaskState } from './initialTaskState';
import { TaskActionModel, TaskActionTypes } from './taskActions';

// A FUNÇÃO DO reducer, É MONITORAR O ESTADO, NÃO PODE SER ASSINCRONO, DEVE TER FUNÇÕES PURAS
export const taskReducer = (
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel => {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const secondsRemaining = newTask.duration * 60;
      const nextCycle = getNextCycle(state.currentCycle);
      return {
        ...state,
        activeTask: newTask,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsRemaining(secondsRemaining),
        currentCycle: nextCycle,
        tasks: [...state.tasks, newTask],
      };
    }
    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formatSecondsRemaining(
          action.payload.secondsRemaining,
        ),
      };
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        }),
      };
    }
    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, completeDate: Date.now() };
          }
          return task;
        }),
      };
    }
    case TaskActionTypes.RESET_TASK: {
      return { ...initialTaskState };
    }
    case TaskActionTypes.CHANGE_CONFIG: {
      return {...state, config: {...action.payload}};
    }
  return state;
}}