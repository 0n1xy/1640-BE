import { Document, Schema, model } from "mongoose";

export interface IComment extends Document {
    roleName: string;
}

const commentSchema = new Schema(
  {
    _id: { type: String, require },
    commentDescription: { type: String, require },
    userID: {type: String, require, ref: "User"},
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default model<IComment>("Comment", commentSchema);