"use client";
import TaskPriority from "@/types/taskPriority";
import { Star } from "lucide-react";

const PriorityBadgeForm = ({ priority }: { priority: string }) => {
  return (
    <span className="flex items-center">
      {priority == TaskPriority.LOW ? (
        <>
          <Star fill="gray" color="gray" size={15} />
          <Star color="gray" size={15} />
          <Star color="gray" size={15} />
          <span className="ml-1">
            ({priority[0]}
            {priority.substring(1).toLowerCase()})
          </span>
        </>
      ) : priority == TaskPriority.MEDIUM ? (
        <>
          <Star fill="gray" color="gray" size={15} />
          <Star fill="gray" color="gray" size={15} />
          <Star color="gray" size={15} />
          <span className="ml-1">
            ({priority[0]}
            {priority.substring(1).toLowerCase()})
          </span>
        </>
      ) : priority == TaskPriority.HIGH ? (
        <>
          <Star fill="gray" color="gray" size={15} />
          <Star fill="gray" color="gray" size={15} />
          <Star fill="gray" color="gray" size={15} />
          <span className="ml-1">
            ({priority[0]}
            {priority.substring(1).toLowerCase()})
          </span>
        </>
      ) : (
        <></>
      )}
    </span>
  );
};
export default PriorityBadgeForm;
