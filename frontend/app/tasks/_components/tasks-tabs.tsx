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
}

const TasksTabs = ({ tasks }: TasksTabsProps) => {
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
        </Tabs>
      </Box>

      <PanelTasksAll value={value} index={0} tasks={tasks} />
    </Box>
  );
};

export default TasksTabs;
