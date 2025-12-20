import { Schema, model } from "mongoose";

const PushSubscriptionSchema = new Schema(
  {
    accountId: { type: String, required: true, unique: true },
    subscription: { type: Object, required: true },
  },
  { timestamps: true }
);

export const PushSubscription = model("PushSubscription", PushSubscriptionSchema);
