"use client";
import apiUrl from "@/const/apiUrl";
import { ITask } from "@/types/task";
import TaskStatus from "@/types/taskStatus";
import { Button } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { useEffect } from "react";
import TasksTabs from "./_components/tasks-tabs";
import { oneWeekFromNow, yesterday } from "@/lib/dates";

const TasksPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch(`${apiUrl}/api/go/tasks`)
          .then((res) => res.json())
          .then((data: ITask[]) => {
            data.sort((a, b) => {
              if (a.dueDate < b.dueDate) {
                return -1;
              } else {
                return 1;
              }
            });
            setTasks(data);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const newTasks = tasks.filter((task) => task.status === TaskStatus.NEW);
  const inProgressTasks = tasks.filter(
    (task) => task.status === TaskStatus.IN_PROGRESS
  );
  const completedTasks = tasks.filter(
    (task) => task.status === TaskStatus.COMPLETED
  );

  const upcomingTasks = tasks.filter(
    (task) =>
      new Date(task.dueDate) > yesterday &&
      new Date(task.dueDate) <= oneWeekFromNow &&
      (task.status == TaskStatus.NEW || task.status == TaskStatus.IN_PROGRESS)
  );

  const overdueTasks = tasks.filter(
    (task) => new Date(task.dueDate) <= yesterday
  );

  console.log(newTasks);
  console.log(inProgressTasks);
  console.log(completedTasks);

  return (
    <div>
      <div className="mb-5">
        <Link href="/tasks/create">
          <Button variant="contained">Create</Button>
        </Link>
      </div>

      <TasksTabs
        tasks={{
          newTasks: newTasks,
          inProgressTasks: inProgressTasks,
          completedTasks: completedTasks,
        }}
        upcomingTasks={upcomingTasks}
        overdueTasks={overdueTasks}
      />
    </div>
  );
};

export default TasksPage;
