import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { MessagesContainer } from './components/MessagesContainer';
import { MainRouter } from './routers/MainRouter';

// ESTADO -> COMPONENTE -> FILHOS
// QUANDO SE USA ESTADO, É SEMPRE O COMPONENTE PASSA PARA OS FILHOS
// NÃO TEM COMO POR O ESTADO EM UM LUGAR, E TEM USAR ESSE ESTADO EM UM COMPONENTE ACIMA

// QUANDO TEM COMPONENTE FILHO PASSANDO PARA OUTRO FILHO USA CONTEXTO
// NO CASO, TERIA QUE PASSAR PARA HOME, DO HOME PASSAR PARA OS "NETOS"

export function App() {
  return (
    <TaskContextProvider>
      <MessagesContainer>
        <MainRouter />
      </MessagesContainer>
    </TaskContextProvider>
  );
}
