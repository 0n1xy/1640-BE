import { Document, Schema, model } from "mongoose";

export interface IFile extends Document {
    imageURL: string;
    docURL: string;
}

const fileSchema = new Schema(
  {
    _id: { type: String, require },
    imageURL: { type: Array<String>, require },
    docURL: { type: Array<String>, require },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default model<IFile>("File", fileSchema);