export type User = {
  _id: string;
  email: string;
};

export type TaskStatus = "todo" | "in-progress" | "done";

export type Task = {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  projectId: string;
};

export type Project = {
  _id: string;
  name: string;
  description?: string;
  createdBy: string;
};
