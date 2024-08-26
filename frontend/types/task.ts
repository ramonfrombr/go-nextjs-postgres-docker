import TaskPriority from "./taskPriority";
import TaskStatus from "./taskStatus";

export interface ITask {
  id: number;
  name: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: Date;
}
