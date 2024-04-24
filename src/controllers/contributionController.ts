import { Request, Response } from "express";
import { uuid } from "uuidv4";
import Contributions, { IContributions } from "../models/contributionsModel";


export const createContributions = async(req: Request, res: Response) => {
    try {
        var status: Boolean = true; 
        if(req.body.status === "Open") {
            status = true;
        } else {
            status = false
        }
        const contribution: IContributions = new Contributions({
            _id: uuid(),
            contributionTitle: req.body.title,
            contributionStatus: status,
            contributionStartDay: req.body.startDay,
            contributionCloseDay: req.body.closeDay,

        })
        await contribution.save();
        return res.status(201).json("Contributions created");
    } catch (e: any) {
        return res.status(500).json({ message: e.message });
    }
}

export const displayContributions = async(req: Request, res: Response) => {
    try {
        const contribution = await Contributions.find()
        return res.status(200).json(contribution)
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}