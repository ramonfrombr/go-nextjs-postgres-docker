import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const TasksPage = () => {
  return (
    <div>
      <div className="mb-5">
        <Link href="/tasks/create">
          <Button variant="contained">Create</Button>
        </Link>
      </div>
    </div>
  );
};

export default TasksPage;
