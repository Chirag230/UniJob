import express from "express"
import { getAllJobs ,postJob,getmyJobs,updateJob,deletejob,getSingleJob} from "../controller/jobController.js";
import { isAuthorized } from "../middleware/auth.js";

const router  = express.Router();

router.get("/getall",getAllJobs);
router.post("/post",isAuthorized,postJob);
router.get("/getmyjobs",isAuthorized,getmyJobs);
router.put("/update/:id",isAuthorized,updateJob);
router.delete("/delete/:id",isAuthorized,deletejob);
router.get("/:id",isAuthorized,getSingleJob);

export default router;