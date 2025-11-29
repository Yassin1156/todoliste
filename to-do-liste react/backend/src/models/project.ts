import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  id: string;
  name: string;
  accountId: string;
}

const ProjectSchema = new Schema <IProject>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  accountId: { type: String, required: true },
});

export const Project = mongoose.model<IProject>("Project", ProjectSchema);