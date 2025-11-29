import mongoose, {Schema, Document} from "mongoose";

export interface ITodo extends Document {
  id: string;
  content: string;
  done: boolean;
  deadline: string;
  projectId: string;
}

const TodoSchema = new Schema<ITodo>({
  id: { type: String, required: true },
  content: { type: String, required: true },
  done: { type: Boolean, required: true },
  deadline: { type: String, required: true },
  projectId: { type: String, required: true },
});

export const Todo = mongoose.model<ITodo>("Todo", TodoSchema);