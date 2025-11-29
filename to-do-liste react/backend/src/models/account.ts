import mongoose, { Document, Schema } from "mongoose";

export interface IAccount extends Document {
  id: string;
  userName: string;
  password: string;
}

const AccountSchema = new Schema<IAccount>({
  id: { type: String, required: true},
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const Account = mongoose.model<IAccount>("Account", AccountSchema);