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
    displayByID,
    displayFaculty,
} from '../controllers/facultyController';

import { createContributions, displayContributions, displayContributionsByID } from './../controllers/contributionController';
import { createStatus, displayStatus } from "../controllers/statusController";
import {
    createSubmission,
    deleteSubmissison,
    displaySubmission,
    displaySubmissionByID,
    updateSubmission,
    updateSubmissionStatus
} from "../controllers/submissionController";
import { displayFile } from '../controllers/fileController';
import { displayReport } from '../controllers/reportController';


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
router.get("/contribution/:_id",  displayContributionsByID)

//Faculty
//[authMiddleware.authentication, authMiddleware.isAdmin],
router.post("/faculty",   createFaculty);
router.get("/faculties", displayFaculty);
router.get("/faculty/:_id", displayByID);


//Status
router.post("/status",  createStatus)
router.get("/status",  displayStatus)

//Report
router.get("/reports", displayReport);

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
router.put("/submissions/:_id", updateSubmission)
router.delete("/submission/:_id", deleteSubmissison)

//File
export default router;