import { getAllResources } from "../service/initializers/getAllResources";
import { patchResource } from "../service/initializers/patchResounce";
import { Project, Task } from "../types/types";

const useDashboard = () => {
  const getAllProjects = () => {
    const projects = getAllResources<Project>({ url: "/projects" });
    return projects;
  };

  const getAllProjectTasks = (id: string) => {
    const projects = getAllResources<Task>({ url: `/tasks/${id}` });
    return projects;
  };

  const updateTaskStatus = async (id: string, status: string) => {
    await patchResource({ url: `/tasks/${id}`, data: { status } });
  };
  return { getAllProjects, getAllProjectTasks, updateTaskStatus };
};

export default useDashboard;
