import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

// O QUE EU FIZ?
// BASICAMENTE, CRIEI UM ARRAY COM O lenght DO currentCycle, OU SEJA, A QUANTIDADE DE CICLOS
// COM ISSO, FIZ UM MAP DESSE ARRAY,
// PEGANDO O nextCycle E nextCycleType, E PASSANDO COM PARÊMETRO NO CSS, ADICIONANDO AS CLASSES CORRESPONDENTES 
export function Cycles() {
  const { state } = useTaskContext();
  const cycleStep = Array.from({ length: state.currentCycle });
  const descriptionCycleMap = {
    workTime: 'foco',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo',
  };
  return (
    <div className={styles.cyclesBox}>
      <span>Ciclos</span>
      <div className={styles.cyclesDots}>
        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);
          return (
            <span
              key={`${nextCycleType}_${nextCycle}`}
              className={`${styles.cyclesDot} ${styles[nextCycleType]}`}
              aria-label={`Indicador de ciclo de ${descriptionCycleMap[nextCycleType]}`}
              title={`Indicador de ciclo de ${descriptionCycleMap[nextCycleType]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
