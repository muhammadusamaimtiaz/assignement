import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ["todo", "in-progress", "done"],
    default: "todo",
  },
  projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
});

export default model("Task", taskSchema);
