"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { redirect } from "next/navigation";
import StatusBadge from "@/components/status-badge";
import { Typography } from "@mui/material";
import ButtonBackToTasks from "../_components/button-back-to-tasks";
import PriorityBadgeForm from "@/components/priority-badge-form";
import apiUrl from "@/const/apiUrl";
import DeleteTaskButton from "./_components/delete-task-button";
import EditTaskButton from "./_components/edit-task-button";
import { ITask } from "@/types/task";
import { useCallback, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const TaskIdPage = ({ params }: { params: { taskId: string } }) => {
  const [task, setTask] = useState<ITask>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/api/go/tasks/${params.taskId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setTask(data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  }, [params.taskId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center pt-10">
        <ClipLoader />
      </div>
    );
  }
  if (error) {
    redirect("/tasks");
  }

  return (
    <div>
      <ButtonBackToTasks />

      <div className="mb-5 flex gap-2 flex-row-reverse">
        <DeleteTaskButton taskId={params.taskId} />
        <EditTaskButton task={task!} />
      </div>
      <TableContainer className="border shadow" component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableBody className="[&_td]:border-0 [&_th]:border-0 [&_th]:font-semibold [&_th]:align-top [&_th]:w-[120px]">
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Task Name:
              </TableCell>
              <TableCell align="left">
                <Typography>{task!.name}</Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Due date:
              </TableCell>
              <TableCell align="left">
                {new Date(task!.dueDate).toLocaleDateString("pt-br")}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Status:
              </TableCell>
              <TableCell align="left">
                <StatusBadge status={task!.status} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Priority:
              </TableCell>
              <TableCell align="left">
                <PriorityBadgeForm priority={task!.priority} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Description:
              </TableCell>
              <TableCell align="left">
                {task?.description ? (
                  task?.description
                ) : (
                  <span className="italic text-gray-500">No description</span>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TaskIdPage;
