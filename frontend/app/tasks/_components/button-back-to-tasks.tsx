import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const ButtonBackToTasks = () => {
  return (
    <div className="mb-5">
      <Link href="/tasks">
        <Button color="info" variant="contained">
          Back
        </Button>
      </Link>
    </div>
  );
};

export default ButtonBackToTasks;
