import TaskStatus from "@/types/taskStatus";

const StatusBadge = ({ status }: { status: TaskStatus }) => {
  return (
    <span
      className={`border px-1 py-[2px] rounded-[4px] font-semibold text-xs text-white ${
        status == TaskStatus.NEW
          ? "bg-yellow-500"
          : status == TaskStatus.IN_PROGRESS
          ? "bg-blue-500"
          : status == TaskStatus.COMPLETED
          ? "bg-green-500"
          : ""
      }`}
    >
      {status.toLocaleLowerCase().replace("_", " ")}
    </span>
  );
};
export default StatusBadge;
