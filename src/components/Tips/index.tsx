import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export const Tips = () => {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);
  const tipsForWhenActiveTask = {
    workTime: (
      <span>
        <strong>Foque</strong> por <strong>{state.config.workTime} min</strong>.
      </span>
    ),
    shortBreakTime: (
      <span>
        <strong>Descanse</strong> por{' '}
        <strong>{state.config.shortBreakTime} min</strong>.
      </span>
    ),
    longBreakTime: (
      <span>
        <strong>Descanso longo</strong>
      </span>
    ),
  };
  const tipsForNoActiveTask = {
    workTime: (
      <span>
        No próximo ciclo <strong>foque</strong> por{' '}
        <strong>{state.config.workTime} min</strong>.
      </span>
    ),
    shortBreakTime: (
      <span>
        No próximo ciclo <strong>descanse</strong> por{' '}
        <strong>{state.config.shortBreakTime} min</strong>.
      </span>
    ),
    longBreakTime: (
      <span>
        <strong>Próximo descanso será longo</strong>
      </span>
    ),
  };
  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  );
};
