import { Request, Response } from "express";

import submissionModel from "../models/submissionModel";



export const displayReport = async(req: Request, res: Response) => {
    try {
        const submission = await submissionModel.find();
        submission.forEach((submission) => {
            submission.contributionID
        })
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

