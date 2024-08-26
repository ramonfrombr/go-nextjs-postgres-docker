"use client";
import {
  Button,
  Modal,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import objectSupport from "dayjs/plugin/objectSupport";
import "dayjs/locale/pt-br";
import StatusBadge from "@/components/status-badge";
import PriorityBadgeForm from "@/components/priority-badge-form";
import TaskPriority from "@/types/taskPriority";
import TaskStatus from "@/types/taskStatus";
import { ITask } from "@/types/task";
import formSchema from "@/types/formSchema";
import apiUrl from "@/const/apiUrl";

const EditTaskButton = ({ task }: { task: ITask }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  type FormData = z.infer<typeof formSchema>;

  const initialData = task;

  dayjs.extend(objectSupport);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: task.name,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: dayjs({
        year: new Date(task.dueDate).getFullYear(),
        month: new Date(task.dueDate).getMonth(),
        day: new Date(task.dueDate).getDate(),
      }),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.put(`${apiUrl}/api/go/tasks/${task.id}`, values);
      toast.success("Task updated");
      router.push(`/tasks/${task.id}`);
      location.reload();
      handleClose();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Button onClick={handleOpen} color="primary" variant="contained">
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="p-5 flex flex-col items-center justify-center"
      >
        <div className="w-[90%] sm:w-[60%] md:w-[50%]">
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={"pt-br"}
          >
            <form
              className="flex flex-col bg-white p-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography variant="h4" gutterBottom>
                Edit Task
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
                        <StatusBadge status={status} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="normal" error={!!errors.status}>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    label="Priority"
                    {...register("priority")}
                    defaultValue={initialData.priority}
                    sx={{ my: 1 }}
                  >
                    {Object.values(TaskPriority).map((priority) => (
                      <MenuItem key={priority} value={priority}>
                        <PriorityBadgeForm priority={priority} />
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
                      open={openDatePicker}
                      onClose={() => setOpenDatePicker(false)}
                      slotProps={{
                        textField: {
                          onClick: () => setOpenDatePicker(true),
                        },
                        openPickerButton: {
                          onClick: () => setOpenDatePicker(true),
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
                UPDATE
              </Button>
            </form>
          </LocalizationProvider>
        </div>
      </Modal>
    </>
  );
};

export default EditTaskButton;
