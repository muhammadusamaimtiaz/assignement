import { createResource } from "../service/initializers/createResource";
import { Project, Task } from "../types/types";

const useProject = () => {
  const createProject = async (data: Omit<Project, "_id" | "createdBy">) => {
    const project = createResource({ url: "/projects", data });
    return project;
  };

  const createTask = async (data: Omit<Task, "_id" | "createdBy">) => {
    const project = createResource({ url: "/tasks", data });
    return project;
  };
  return { createProject, createTask };
};

export default useProject;
