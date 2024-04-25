import { Document, Schema, model } from "mongoose";
export interface IUser extends Document {
  email: string;
  password: string;
  role: String;
  userName: String;
  facultyID: String;
}

const userSchema = new Schema(
  {
    _id: { type: String, require },
    email: { type: String, require },
    password: { type: String, require },
    role: { type: String, require, ref: "Role" },
    userName: { type: String },
    address: { type: String },
    dateOfBirth: { type: Date },
    facultyID: {type: String, require, ref: "Faculty"},
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", userSchema);