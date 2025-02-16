import { getAllProjects } from "@/actions/project";
import React from "react";

const dashboardPage = async () => {
  const allProjects = await getAllProjects();
  return (
    <div className="w-full flex flex-col gap-6 relative">
      <div className="flex flex-col-reverse items-start w-full gap-6 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col items-start"></div>
        <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
          Your Projects
        </h1>
        <p className="text-base font-normal dark:text-secondary">
          View, create, and manage your projects.
        </p>
      </div>
      {/* {projects} */}
    </div>
  );
};

export default dashboardPage;
