import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './taskActions';
import { loadBeep } from '../../utils/loadBeep';
import { TaskStateModel } from '../../models/TaskStateModel';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storageState = localStorage.getItem('state');

    if (!storageState) return initialTaskState;

    const parsedStorageState = JSON.parse(storageState) as TaskStateModel;

    return {
      ...parsedStorageState,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: '00:00',
    };
  });
  // USAR O useRef, PARA QUE ENTRE AS RENDERIZAÇÕES ELE MANTENHA O VALOR
  const playBeepRef = useRef<() => void | null>(null);
  const worker = TimerWorkerManager.getInstance();

  worker.onmessage(event => {
    const countDownSeconds = event.data;

    if (countDownSeconds <= 0) {
      // SE TIVER A FUNÇÃO CARREGADA, ELE DISPARA ELA, TOCANDO O SOM, E DEPOIS ZERA O playBeef
      if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null;
      }
      dispatch({ type: TaskActionTypes.COMPLETE_TASK });
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  // USE EFFECT QUE CONTROLA A TASK
  useEffect(() => {
    // ARMAZENANDO NO LOCAL STORAGE
    localStorage.setItem('state', JSON.stringify(state));
    if (!state.activeTask) {
      worker.terminate();
    }

    // COLOCA O TIMER NO TITULO DA PAGINA
    document.title = `${state.formattedSecondsRemaining} - Pomodoro`;

    worker.postMessage(state);
  }, [worker, state]);

  // USE EFFECT QUE CONTROLA O SOM DA TASK COMPLETADA
  useEffect(() => {
    // SE TIVER UMA TASK ATIVA, E O playBeef NAO TIVER NADA, ELE CARREGA A FUNÇÃO PARA O playBeef
    // CASO A TASK SEJA INTERROMPIDA, ELE ZERA O playBeef
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
