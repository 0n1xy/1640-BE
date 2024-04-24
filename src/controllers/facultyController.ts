import { Request, Response } from "express";
import { uuid } from "uuidv4";
import Faculty, {IFaculty} from "../models/facultyModel";


export const createFaculty = async(req: Request, res: Response) => {
    try {
        const faculty: IFaculty = new Faculty({
            _id: uuid(),
            facultyName: req.body.facultyName,
        })
        await faculty.save();
        return res.status(201).json("Faculty created");
    } catch (e: any) {
        return res.status(500).json({ message: e.message });
    }
}

export const displayFaculty = async(req: Request, res: Response) => {
    try {
        const faculty = await Faculty.find()
        return res.status(200).json(faculty)
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}
