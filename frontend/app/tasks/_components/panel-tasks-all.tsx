import { ITask } from "@/types/task";
import CustomTabPanel from "./custom-tab-panel";
import TaskSummary from "./task-summary";
import TaskStatus from "@/types/taskStatus";

interface PanelTasksAllProps {
  value: number;
  index: number;
  tasks: {
    newTasks: ITask[];
    inProgressTasks: ITask[];
    completedTasks: ITask[];
  };
}

const PanelTasksAll = ({ value, index, tasks }: PanelTasksAllProps) => {
  const noTasks =
    tasks.newTasks.length == 0 &&
    tasks.inProgressTasks.length == 0 &&
    tasks.completedTasks.length == 0;

  return (
    <CustomTabPanel value={value} index={index}>
      <main className="flex flex-col gap-2">
        {noTasks && (
          <h2 className="text-center text-lg text-gray-500 p-3">
            There are no tasks. Click the &quot;CREATE&quot; button to create a
            task.
          </h2>
        )}
        {tasks.newTasks.length != 0 && (
          <TaskSummary
            expanded={true}
            tasks={tasks.newTasks}
            heading=""
            status={TaskStatus.NEW}
          />
        )}
        {tasks.inProgressTasks.length != 0 && (
          <TaskSummary
            expanded={true}
            tasks={tasks.inProgressTasks}
            heading=""
            status={TaskStatus.IN_PROGRESS}
          />
        )}
        {tasks.completedTasks.length != 0 && (
          <TaskSummary
            tasks={tasks.completedTasks}
            heading=""
            status={TaskStatus.COMPLETED}
          />
        )}
      </main>
    </CustomTabPanel>
  );
};

export default PanelTasksAll;
