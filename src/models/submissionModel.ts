import { Document, Schema, model } from "mongoose";

export interface ISubmission extends Document {
  statusID: string;
  commentID: string;
  contributionID: string;
  facultyID: string;
  fileID: string,
  userID: string,
}

const submissionSchema = new Schema(
  {
    _id: { type: String, require },
    description: { type: String, require },
    statusID: { type: String, require, ref: "Status" },
    commentID: { type: String, ref: "Comment" },
    contributionID: { type: String, require, ref: "Contributions" },
    facultyID: { type: String, require, ref: "Faculty" },
    fileID: { type: String, require, ref: "File" },
    userID: {type: String, require },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default model<ISubmission>("Submission", submissionSchema);