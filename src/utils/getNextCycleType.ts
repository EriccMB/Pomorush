import { TaskModel } from '../models/TaskModel';

export const getNextCycleType = (currentCycle: number): TaskModel['type'] => {
  if (currentCycle % 8 === 0) return 'longBreakTime';
  if (currentCycle % 2 === 0) return 'shortBreakTime';
  return 'workTime';
};
