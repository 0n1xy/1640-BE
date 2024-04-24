import { Request, Response } from "express";
import { uuid } from "uuidv4";
import statusModel, { IStatus } from "../models/statusModel";


export const createStatus = async(req: Request, res: Response) => {
    try {
        const status: IStatus = new statusModel({
            _id: uuid(),
            statusName: req.body.statusName,
        })
        await status.save()

        return res.status(201).json("Status created");
    } catch (e: any) {
        return res.status(500).json({ message: e.message });
    }
}

export const displayStatus = async(req: Request, res: Response) => {
    try {
        const statusID = await statusModel.find()
        if (!statusID) {
            return res.status(200).json({
              message: "Can't find any status",
            });
          } else {
            return res.send({
              data: statusID,
            });
          }
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}