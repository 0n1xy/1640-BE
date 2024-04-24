import { Response } from "express";
import { storage } from "../config/database/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export const uploadDoc = async (req: any, res: Response) => {
  try {
    const dateTime = new Date();
    const storageRef = ref(
      storage,
      `docs/${req.file?.originalname + "       " + dateTime}`
    );
    const metadata = {
      contentType: req.file?.mimetype,
    };
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("File successfully uploaded.");
    const link = downloadURL;
    return link;
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};

export const getDownloadURLs = async() => {
  

}

export const uploadImage = async (req: any, res: Response) => {
  try {
    const dateTime = new Date();
    const storageRef = ref(
      storage,
      `images/${req.file?.originalname + "       " + dateTime}`
    );
    const metadata = {
      contentType: req.file?.mimetype,
    };
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("Image successfully uploaded.");
    const link = downloadURL;
    return link;
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};