import { Document, Schema, model } from "mongoose";

export interface IStatus extends Document {
    statusName: string;
}

const statusSchema = new Schema(
  {
    _id: { type: String, require },
    statusName: { type: String, require },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default model<IStatus>("Status", statusSchema);