import { Trash2Icon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { MainTemplate } from '../../templates/MainTemplate';
import styles from './styles.module.css';
import { Heading } from '../../components/Heading';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate.ts';
import { getTaskStatus } from '../../utils/getTaskStatus.ts';
import { sortTasks, SortTasksOptions } from '../../utils/sortTasks.ts';
import { useEffect, useState } from 'react';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions.ts';
import { toastifyAdapter } from '../../adapters/toastifyAdapter.ts';

export const History = () => {
  const { state, dispatch } = useTaskContext();
  const [clearHistory, setClearHistory] = useState(false);

  const [sortTaskOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: 'startDate',
        direction: 'desc',
      };
    },
  );

  // FUNÇÃO DE ORDENAÇÃO DO ESTADO
  // NA PRIMEIRA RENDERIZAÇÃO, ELE JA VEM ORDENADO PELO startDate COMO PADRÃO
  useEffect(() => {
    setSortTaskOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  // SE O RETORNO DA FUNÇÃO handleClearHistory FOR TRUE, ELE LIMPA O HISTORICO
  useEffect(() => {
    if (!clearHistory) return;
    dispatch({ type: TaskActionTypes.RESET_TASK });
    setClearHistory(false);
  }, [clearHistory, dispatch]);

  // FUNÇÃO DE CLEANUP, QUANDO SAI DA PAGINA, ELE DESMONTA O COMPONENTE E SOME A MENSAGEM
  useEffect(() => {
    document.title = 'Histórico';
    return () => {
      toastifyAdapter.dismiss();
    };
  }, []);

  const handleSortTasks = ({
    field,
  }: Pick<SortTasksOptions, 'field' | 'direction'>) => {
    const newDirection = sortTaskOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortTaskOptions({
      tasks: sortTasks({
        tasks: sortTaskOptions.tasks,
        direction: newDirection,
        field,
      }),
      direction: newDirection,
      field,
    });
  };

  const handleClearHistory = () => {
    toastifyAdapter.dismiss();
    // O RETORNO DA FUNCAO RETORNA BOOLEAN
    toastifyAdapter.confirm('Tem certeza?', confirmation => {
      setClearHistory(confirmation);
    });
  };

  const taskTypeMap = {
    workTime: 'Foco',
    shortBreakTime: 'Descanso curto',
    longBreakTime: 'Descanso Longo',
  };
  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>
          {state.tasks.length > 0 && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<Trash2Icon />}
                aria-label='Apagar Histórico'
                title='Apagar Histórico'
                onClick={handleClearHistory}
              />
            </span>
          )}
        </Heading>
      </Container>
      <Container>
        {state.tasks.length > 0 && (
          <div className={styles.tableBox}>
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() => handleSortTasks({ field: 'name' })}
                    className={styles.thSort}
                  >
                    Tarefa ↕
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: 'duration' })}
                    className={styles.thSort}
                  >
                    Duração ↕
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: 'startDate' })}
                    className={styles.thSort}
                  >
                    Data ↕
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortTaskOptions.tasks.map(task => {
                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration} min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeMap[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {state.tasks.length <= 0 && <p>Não existem Tarefas ainda!</p>}
      </Container>
    </MainTemplate>
  );
};
