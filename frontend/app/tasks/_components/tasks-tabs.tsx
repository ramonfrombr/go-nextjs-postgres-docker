import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import CustomTabPanel from "./custom-tab-panel";
import { ITask } from "@/types/task";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PanelTasksAll from "./panel-tasks-all";
import PanelTasksUpcoming from "./panel-tasks-upcoming";
import PanelTasksOverdue from "./panel-tasks-overdue";
import PanelTasksStatistics from "./panel-tasks-statistics";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TasksTabsProps {
  tasks: {
    newTasks: ITask[];
    inProgressTasks: ITask[];
    completedTasks: ITask[];
    upcomingTasks: ITask[];
    overdueTasks: ITask[];
    lowPriorityTasks: ITask[];
    mediumPriorityTasks: ITask[];
    highPriorityTasks: ITask[];
  };
}

const TasksTabs = ({ tasks }: TasksTabsProps) => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const createTaskByStatusData = () => {
    const data = [];

    if (tasks.newTasks.length) {
      data.push({ value: tasks.newTasks.length, label: "New" });
    }

    if (tasks.inProgressTasks.length) {
      data.push({
        value: tasks.inProgressTasks.length,
        label: "In Progress",
      });
    }

    if (tasks.completedTasks.length) {
      data.push({
        value: tasks.completedTasks.length,
        label: "Completed",
      });
    }

    return data;
  };

  const createTaskByPriorityData = () => {
    const data = [];

    if (tasks.lowPriorityTasks.length) {
      data.push({
        value: tasks.lowPriorityTasks.length,
        label: "Low Priority",
        color: "rgb(34,197,94)",
      });
    }

    if (tasks.mediumPriorityTasks.length) {
      data.push({
        value: tasks.mediumPriorityTasks.length,
        label: "Medium Priority",
        color: "rgb(234,179,8)",
      });
    }

    if (tasks.highPriorityTasks.length) {
      data.push({
        value: tasks.highPriorityTasks.length,
        label: "High Priority",
        color: "rgb(239,68,68)",
      });
    }

    return data;
  };

  const taskByStatusData = createTaskByStatusData();
  const taskByPriorityData = createTaskByPriorityData();

  const noTasks =
    tasks.newTasks.length == 0 &&
    tasks.inProgressTasks.length == 0 &&
    tasks.completedTasks.length == 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example scrollable"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="All Tasks" {...a11yProps(0)} />
          <Tab label="Upcoming Tasks" {...a11yProps(1)} />
          <Tab label="Overdue Tasks" {...a11yProps(2)} />
          <Tab label="Statistics" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <PanelTasksAll value={value} index={0} tasks={tasks} />
      <PanelTasksUpcoming value={value} index={1} tasks={tasks.upcomingTasks} />
      <PanelTasksOverdue value={value} index={2} tasks={tasks.overdueTasks} />
      <PanelTasksStatistics
        value={value}
        index={3}
        taskByStatusData={taskByStatusData}
        taskByPriorityData={taskByPriorityData}
        noTasks={noTasks}
      />
    </Box>
  );
};

export default TasksTabs;
