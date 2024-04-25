import { Request, Response } from "express";
import { uuid } from "uuidv4";
import submissionModel, { ISubmission } from "../models/submissionModel";

import contributionsModel from "../models/contributionsModel";
import fileModel, { IFile } from "../models/fileModel";
import { ref, uploadBytesResumable, getDownloadURL, UploadResult } from 'firebase/storage';
import { storage } from "../config/database/firebase";
import statusModel from "../models/statusModel";
import facultyModel from "../models/facultyModel";
import { emailNotification } from "../services/notificationServices";
import { mailOption, transporter } from "../config/service/mailService";
import JSZip, { file } from "jszip";

export const createSubmission = async (req: Request, res: Response): Promise<Response> => {
    try {
        let imageUploadURL: string = "";
        let docUploadURL: string = "";

        // Handling image files
        const images: Express.Multer.File[] | undefined = (req.files as any)['images'];
        if (images) {
            for (const image of images) {
                try {
                    const dateTime: Date = new Date();
                    const storageRef = ref(
                        storage,
                        `images/${image.originalname + "       " + dateTime}`
                    );
                    const metadata = {
                        contentType: image.mimetype,
                    };
                    const snapshot: UploadResult = await uploadBytesResumable(
                        storageRef,
                        image.buffer,
                        metadata
                    );
                    const downloadURL: string = await getDownloadURL(snapshot.ref);
                    console.log("Image successfully uploaded.");
                    imageUploadURL = downloadURL;
                } catch (error: any) {
                    return res.status(400).send(error.message);
                }
            }
        }

        // Handling document file
        const docs: Express.Multer.File[] | undefined = (req.files as any)['docs'];
        if (docs) {
            const doc: Express.Multer.File = docs[0];
            try {

                const dateTime: Date = new Date();
                const storageRef = ref(
                    storage,
                    `docs/${doc.originalname}`
                );
                const metadata = {
                    contentType: doc.mimetype,
                };
                const snapshot: UploadResult = await uploadBytesResumable(
                    storageRef,
                    doc.buffer,
                    metadata
                );
                const downloadURL: string = await getDownloadURL(snapshot.ref);
                console.log("Document successfully uploaded.");
                docUploadURL = downloadURL;
            } catch (error) {
                console.log("Upload fail");
            }
        }

        const file: IFile = new fileModel({
            _id: uuid(),
            imageURL: imageUploadURL,
            docURL: docUploadURL,
        });

        await file.save();

        const statusID = await statusModel.findOne({ statusName: req.body.status });
        const contributionID = await contributionsModel.findOne({ contributionTitle: req.body.contributionTitle });
        const facultyID = await facultyModel.findOne({ facultyName: req.body.faculty })
        const userID = req.body.userID;
        const submission: ISubmission = new submissionModel({
            _id: uuid(),
            description: req.body.description,
            statusID: statusID?._id,
            contributionID: contributionID?._id,
            facultyID: facultyID?._id,
            fileID: file._id,
            userID,
        });
        await emailNotification(transporter, mailOption)
        await submission.save();

        return res.status(201).json("Submission created");
    } catch (e: any) {
        return res.status(500).json({ message: e.message });
    }
};

export const displaySubmission = async (req: Request, res: Response) => {
    try {
        const submission = await submissionModel.find()

        if (!submission) {
            return res.status(200).json({
                message: "Can't find any Submission",
            });
        } else {
            return res.status(200).json(submission)
        }

    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const displaySubmissionByID = async (req: Request, res: Response) => {
    try {

    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateSubmissionStatus = async (req: Request, res: Response) => {
    try {
        const submissionID = await submissionModel.findById(req.params)
        if (!submissionID) {
            res.status(404).json("Can't find any submission")
        } else {
            const statusInput = req.body.status
            const statusIDUpdate = await statusModel.findOne({ statusName: statusInput })
            if (statusInput == "Accept") {
                await submissionModel.findByIdAndUpdate(req.params, { statusID: statusIDUpdate?._id })
                await emailNotification(transporter, mailOption)
                return res.status(201).json("Submission updated");
            } else {
                await submissionModel.findByIdAndUpdate(req.params, { statusID: statusIDUpdate?._id })
                return res.status(201).json("Submission updated");
            }
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateSubmission = async (req: Request, res: Response) => {
    try {
        const submissionID = await submissionModel.findById(req.params)
        if (!submissionID) {
            res.status(404).json("Can't find any submission")
        } else {
            await submissionModel.findByIdAndUpdate(submissionID._id, {
                description: req.body.description
            })
            return res.status(201).json("Submission updated");
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteSubmissison = async(req: Request, res: Response) => {
    try {
        const submissionID = await submissionModel.findById(req.params)
        if (!submissionID) {
            res.status(404).json("Can't find any submission")
        } else {
            await submissionModel.findByIdAndDelete(submissionID._id)
            return res.status(201).json("Submission delete");
        }
    } catch (error) {
        
    }
}