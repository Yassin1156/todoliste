import mongoose, {Schema, Document} from "mongoose";

export interface ITodo extends Document { //Wegen Typescript muss hier Document importiert werden.
  id: string;
  content: string;
  done: boolean;
  deadline: string;
  projectId: string;
  reminded: boolean;
}

const TodoSchema = new Schema<ITodo>({
  id: { type: String, required: true },
  content: { type: String, required: true },
  done: { type: Boolean, required: true },
  deadline: { type: String, required: true },
  projectId: { type: String, required: true },
  reminded: { type: Boolean, default: false },
});

export const Todo = mongoose.model<ITodo>("Todo", TodoSchema); //Das Model Todo wird exportiert, damit es in anderen Dateien verwendet werden kann. Dabei erstellt mongoose eine Collection namens "todos" in der Datenbank (automatisch im Plural).