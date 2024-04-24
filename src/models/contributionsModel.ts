import { Document, Schema, model } from "mongoose";

export interface IContributions extends Document {
    contributionTitle: string;
}

const contributionsSchema = new Schema(
  {
    _id: { type: String, require },
    contributionTitle: { type: String, require },
    contributionStatus: {type: Boolean, require},
    contributionStartDay: {type: Date, require},
    contributionCloseDay: {type: Date, require},
    submissionID: {type: String, require, ref: "Submission"},
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default model<IContributions>("Contributions", contributionsSchema);