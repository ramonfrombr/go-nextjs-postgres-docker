"use client";
import React, { useState } from "react";
import { z } from "zod";
import ButtonBackToTasks from "../_components/button-back-to-tasks";
import formSchema from "@/types/formSchema";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TaskPriority from "@/types/taskPriority";
import TaskStatus from "@/types/taskStatus";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const TaskCreatePage = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  type FormData = z.infer<typeof formSchema>;

  const initialData = {
    name: "",
    description: "",
    status: TaskStatus.NEW,
    priority: TaskPriority.LOW,
    dueDate: dayjs(),
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("http://localhost:8000/api/go/tasks", {
        ...values,
        dueDate: values.dueDate.$d.toISOString(),
      });
      router.push(`/tasks`);
      toast.success("Task created");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <ButtonBackToTasks />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form
          className="flex flex-col bg-white p-5 border shadow"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h4" gutterBottom>
            Create a task
          </Typography>
          <TextField
            label="Task name"
            fullWidth
            margin="normal"
            defaultValue={initialData.name}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Task description"
            fullWidth
            multiline
            margin="normal"
            defaultValue={initialData.description}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          <div className="grid grid-cols-2 gap-2">
            <FormControl fullWidth margin="normal" error={!!errors.status}>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                {...register("status")}
                defaultValue={initialData.status}
                sx={{ my: 1 }}
              >
                {Object.values(TaskStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" error={!!errors.priority}>
              <InputLabel>Priority</InputLabel>
              <Select
                label="Priority"
                {...register("priority")}
                defaultValue={initialData.priority}
                sx={{ my: 1 }}
              >
                {Object.values(TaskPriority).map((priority) => (
                  <MenuItem key={priority} value={priority}>
                    {priority}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <Controller
            control={control}
            name="dueDate"
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <DatePicker
                  label="Due date"
                  value={field.value}
                  inputRef={field.ref}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                  open={open}
                  onClose={() => setOpen(false)}
                  slotProps={{
                    textField: {
                      onClick: () => setOpen(true),
                    },
                    openPickerButton: {
                      onClick: () => setOpen(true),
                    },
                  }}
                />
              );
            }}
          />

          <Button
            className="mt-5"
            type="submit"
            variant="contained"
            color="primary"
          >
            CREATE
          </Button>
        </form>
      </LocalizationProvider>
    </div>
  );
};

export default TaskCreatePage;
