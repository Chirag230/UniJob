import express from "express"
import { isAuthorized } from "../middleware/auth.js";
import { employerGetAllAplications,jobseekerGetAllAplications,jobseekerDeleteAplication,postApplication } from "../controller/applicationController.js";

const router  = express.Router();

router.get("/employer/getall",isAuthorized,employerGetAllAplications);
router.post("/post",isAuthorized,postApplication)
router.get("/jobseeker/getall",isAuthorized,jobseekerGetAllAplications);
router.delete("/delete/:id",isAuthorized,jobseekerDeleteAplication);


export default router;