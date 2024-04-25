import { Request, Response } from "express";


import fileModel, { IFile } from "../models/fileModel";


export const displayFile = async (req: Request, res: Response) => {
    try {
        const file = await fileModel.findById(req.params)

        if (!file) {
            return res.status(200).json({
                message: "Can't find any Submission",
            });
        } else {
            return res.status(200).json(file)
        }

    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

