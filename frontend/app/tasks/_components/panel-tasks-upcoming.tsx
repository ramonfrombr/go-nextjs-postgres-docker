import { ITask } from "@/types/task";
import CustomTabPanel from "./custom-tab-panel";
import TaskSummary from "./task-summary";

const PanelTasksUpcoming = ({
  value,
  index,
  tasks,
}: {
  value: number;
  index: number;
  tasks: ITask[];
}) => {
  return (
    <CustomTabPanel value={value} index={index}>
      {tasks.length == 0 && (
        <h2 className="text-center text-lg text-gray-500 p-3">
          There are no upcoming tasks.
        </h2>
      )}
      {tasks.length != 0 && (
        <TaskSummary expanded={true} tasks={tasks} heading="Upcoming Tasks" />
      )}
    </CustomTabPanel>
  );
};

export default PanelTasksUpcoming;
