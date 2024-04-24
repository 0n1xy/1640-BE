import { Document, Schema, model } from "mongoose";

export interface IRole extends Document {
    roleName: string;
}

const roleSchema = new Schema(
  {
    _id: { type: String, require },
    roleName: { type: String, require },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default model<IRole>("Role", roleSchema);