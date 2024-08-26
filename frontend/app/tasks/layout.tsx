import React from "react";

export const revalidate = 0;

const TaskLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-2 md:py-5 sm:px-[5%] md:px-[10%] lg:px-[15%] bg-gray-50 min-h-screen">
      {children}
    </div>
  );
};

export default TaskLayout;
