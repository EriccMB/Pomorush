import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import styles from './styles.module.css';
import { useRef } from 'react';
import { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';
import { toastifyAdapter } from '../../adapters/toastifyAdapter';
// import { useTaskContext } from '../../contexts/useTaskContext';

// IMPORTANTE
// QUANDO USA setState, ELE RENDERIZA DENOVO TODOS OS COMPONENTES - FORMA CONTROLADA
// USA state QUANDO PRECISA DE CONTROLAR EM TEMPO REAL, VALIDAR EM TEMPO REAL
//
// QUANDO USA useRef, ELE NÃO RE-RENDERIZA - FORMA NÃO CONTROLADA
// USA ref QUANDO NÃO PRECISA DE CONTROLAR EM TEMPO REAL, VALIDAR DEPOIS DE ENVIAR O FORMULARIO, POR EXEMPLO

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

  // PRÓXIMO CICLO
  // ANTES DE ENVIAR PARA O FORMULÁRIO, O PRÓXIMO CICLO FICARÁ DEFINIDO ANTES
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const handleCreateNewTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toastifyAdapter.dismiss();
    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      toastifyAdapter.warning('Digite o nome da tarefa!');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      duration: state.config[nextCycleType], // PEGA A DURAÇÃO, PASSANDO COMO PARÃMETRO O nextCycleType
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      type: nextCycleType,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });

    toastifyAdapter.success('Tarefa iniciada!');
  };

  const handleInterruptTask = () => {
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
    toastifyAdapter.dismiss();
    toastifyAdapter.error('Tarefa interrompida!');
  };

  return (
    <form onSubmit={handleCreateNewTask} action='#' className={styles.formBox}>
      <div className={styles.formRow}>
        <DefaultInput
          labelText='Tarefa'
          id='inputForm'
          type='text'
          placeholder='Digite o nome da tarefa'
          title='TAREFA'
          ref={taskNameInput}
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
        />
      </div>
      <div className={styles.formRow}></div>
      <Tips />
      {state.currentCycle > 0 && (
        <div className={styles.formRow}>
          <Cycles />
        </div>
      )}
      <div className={styles.formRow}>
        {!state.activeTask && (
          <DefaultButton
            aria-label='Iniciar uma nova tarefa'
            title='Iniciar uma nova tarefa'
            type='submit'
            color='purple'
            icon={<PlayCircleIcon />}
          />
        )}
        {!!state.activeTask && (
          <DefaultButton
            aria-label='Parar uma tarefa'
            title='Parar uma tarefa'
            type='button'
            onClick={handleInterruptTask}
            color='red'
            icon={<StopCircleIcon />}
          />
        )}
      </div>
    </form>
  );
}
