import { useContext } from 'react';
import { TaskContext } from './TaskContext';

// MEU PROPRIO HOOK DO context

export function useTaskContext() {
  return useContext(TaskContext);
}
