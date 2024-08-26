"use client";
import { Star } from "lucide-react";
import TaskPriority from "../types/taskPriority";

const PriorityBadge = ({ priority }: { priority: TaskPriority }) => {
  return (
    <span className="flex">
      {priority == TaskPriority.LOW ? (
        <>
          <Star fill="gray" color="gray" size={15} />
          <Star color="gray" size={15} />
          <Star color="gray" size={15} />
        </>
      ) : priority == TaskPriority.MEDIUM ? (
        <>
          <Star fill="gray" color="gray" size={15} />
          <Star fill="gray" color="gray" size={15} />
          <Star color="gray" size={15} />
        </>
      ) : priority == TaskPriority.HIGH ? (
        <>
          <Star fill="gray" color="gray" size={15} />
          <Star fill="gray" color="gray" size={15} />
          <Star fill="gray" color="gray" size={15} />
        </>
      ) : (
        <></>
      )}
    </span>
  );
};
export default PriorityBadge;
