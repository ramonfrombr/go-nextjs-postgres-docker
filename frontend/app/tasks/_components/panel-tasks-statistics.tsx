import React from "react";
import CustomTabPanel from "./custom-tab-panel";
import TaskChart from "./task-chart";

interface PanelTasksStatistics {
  value: number;
  index: number;
  taskByStatusData: {
    value: number;
    label: string;
  }[];
  taskByPriorityData: {
    value: number;
    label: string;
  }[];
  noTasks: boolean;
}

const PanelTasksStatistics = ({
  value,
  index,
  taskByStatusData,
  taskByPriorityData,
  noTasks,
}: PanelTasksStatistics) => {
  return (
    <CustomTabPanel value={value} index={index}>
      {noTasks && (
        <h2 className="text-center text-lg text-gray-500 p-3">
          There are no tasks.
        </h2>
      )}
      {!noTasks && (
        <div className="flex-1 bg-white border shadow p-2 md:py-5">
          <TaskChart heading="Tasks by Status" data={taskByStatusData} />
          <TaskChart heading="Tasks by Priority" data={taskByPriorityData} />
        </div>
      )}
    </CustomTabPanel>
  );
};

export default PanelTasksStatistics;
