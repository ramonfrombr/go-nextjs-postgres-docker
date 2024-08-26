"use client";
import apiUrl from "@/const/apiUrl";
import { ITask } from "@/types/task";
import TaskStatus from "@/types/taskStatus";
import { Button } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { useEffect } from "react";

const TasksPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch(`${apiUrl}/api/go/tasks`)
          .then((res) => res.json())
          .then((data) => {
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
    </div>
  );
};

export default TasksPage;
