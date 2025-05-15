import { SaveIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import styles from './styles.module.css';
import { useEffect, useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { toastifyAdapter } from '../../adapters/toastifyAdapter';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

export function Config() {
  const { state, dispatch } = useTaskContext();
  const workTimeRef = useRef<HTMLInputElement>(null);
  const shortBreakTimeRef = useRef<HTMLInputElement>(null);
  const longBreakTimeRef = useRef<HTMLInputElement>(null);

  const handleSaveConfigs = (e: React.FormEvent<HTMLFormElement>) => {
    toastifyAdapter.dismiss();
    e.preventDefault();
    const workTime = Number(workTimeRef?.current?.value);
    const shortBreakTime = Number(shortBreakTimeRef?.current?.value);
    const longBreakTime = Number(longBreakTimeRef?.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      return toastifyAdapter.error('Digite apenas números para os campos');
    }

    if (workTime < 1 || workTime > 99) {
      return toastifyAdapter.error('Digite valores entre 1 e 99 no campo FOCO');
    }
    if (shortBreakTime < 1 || shortBreakTime > 30) {
      return toastifyAdapter.error(
        'Digite valores entre 1 e 30 no campo DESCANSO CURTO',
      );
    }
    if (longBreakTime < 1 || longBreakTime > 60) {
      return toastifyAdapter.error(
        'Digite valores entre 1 e 60 no campo DESCANSO LONGO',
      );
    }

    dispatch({
      type: TaskActionTypes.CHANGE_CONFIG,
      payload: { workTime, shortBreakTime, longBreakTime },
    });
    toastifyAdapter.success('Alterações feitas');
  };

  useEffect(() => {
    document.title = 'Configurações';
  }, []);
  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <span>Configure os minutos para os ciclos do Pomodoro</span>
      </Container>

      <Container>
        <form
          onSubmit={handleSaveConfigs}
          action='#'
          className={styles.formBox}
        >
          <div className={styles.formRow}>
            <DefaultInput
              ref={workTimeRef}
              id='workTime'
              labelText='Foco (min)'
              placeholder=''
              defaultValue={state.config.workTime}
              type='number'
            />
          </div>
          <div className={styles.formRow}>
            <DefaultInput
              ref={shortBreakTimeRef}
              id='shortBreakTime'
              labelText='Descanso curto (min)'
              placeholder=''
              defaultValue={state.config.shortBreakTime}
              type='number'
            />
          </div>
          <div className={styles.formRow}>
            <DefaultInput
              ref={longBreakTimeRef}
              id='longBreakTime'
              labelText='Descanso longo (min)'
              placeholder=''
              defaultValue={state.config.longBreakTime}
              type='number'
            />
          </div>
          <div className={styles.formRow}>
            <DefaultButton
              icon={<SaveIcon />}
              aria-label='Salvar Configurações'
              title='Salvar Configurações'
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
