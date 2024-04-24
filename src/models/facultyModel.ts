import { Document, Schema, model } from "mongoose";

export interface IFaculty extends Document {
    roleName: string;
}

const facultySchema = new Schema(
  {
    _id: { type: String, require },
    facultyName: { type: String, require },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default model<IFaculty>("Faculty", facultySchema);