import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";
import TaskStatus from "./taskStatus";
import TaskPriority from "./taskPriority";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Task name is required",
    })
    .max(50, {
      message: "Task name too long (maximum 50 characters)",
    }),
  description: z
    .string()
    .max(500, {
      message: "Description is too long (maximum 500 characters)",
    })
    .optional(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  dueDate: z.custom<Dayjs>((val) => val instanceof dayjs, "Invalid date"),
});

export default formSchema;
