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
  };
  upcomingTasks: ITask[];
  overdueTasks: ITask[];
}

const TasksTabs = ({ tasks, upcomingTasks, overdueTasks }: TasksTabsProps) => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
        </Tabs>
      </Box>

      <PanelTasksAll value={value} index={0} tasks={tasks} />
      <PanelTasksUpcoming value={value} index={1} tasks={upcomingTasks} />
      <PanelTasksOverdue value={value} index={2} tasks={overdueTasks} />
    </Box>
  );
};

export default TasksTabs;
