import multer from 'multer';
import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
const router: Router = Router();

const upload = multer({ storage: multer.memoryStorage() });


import {
    createRole,
    displayAllRole,
    displayRoleID,
    updateRole,
    deleteRole
} from "../controllers/roleController"

import {
    createFaculty,
    displayFaculty,
} from '../controllers/facultyController';

import { createContributions, displayContributions } from './../controllers/contributionController';
import { createStatus, displayStatus } from "../controllers/statusController";
import {
    createSubmission,
    displaySubmission,
    displaySubmissionByID,
    updateSubmissionStatus
} from "../controllers/submissionController";
import { displayFile } from '../controllers/fileController';


//role
//[authMiddleware.authentication, authMiddleware.isAdmin]
router.post("/role", createRole);
router.get("/roles",  displayAllRole);
router.get("/role/:_id",  displayRoleID);
router.put("/role/:_id",  updateRole);
router.delete("/role/:_id",  deleteRole);

//Contribution
//[authMiddleware.authentication, authMiddleware.isAdmin],
router.post("/contribution", createContributions)
router.get("/contributions",  displayContributions)

//Faculty
//[authMiddleware.authentication, authMiddleware.isAdmin],
router.post("/faculty",   createFaculty);
router.get("/faculties", displayFaculty);
// router.get("/role/:_id", [authMiddleware.authentication, authMiddleware.isAdmin], displayRoleID);
// router.put("/role/:_id", [authMiddleware.authentication, authMiddleware.isAdmin], updateRole);
// router.delete("/role/:_id", [authMiddleware.authentication, authMiddleware.isAdmin], deleteRole);

//Status
router.post("/status",  createStatus)
router.get("/status",  displayStatus)


//File
router.get("/file/:_id", displayFile)
// Mail


//Submission
//[authMiddleware.authentication, authMiddleware.denyGuest, authMiddleware.isUser],
const cpUpload = upload.fields([
    { name: 'docs', maxCount: 1 },
    { name: 'images', maxCount: 8 }
])
router.post("/submission", cpUpload,  createSubmission)
router.get("/submissions",  displaySubmission)
router.get("submission/:_id",  displaySubmissionByID)
router.patch("/submission/:_id", updateSubmissionStatus)

//File
export default router;