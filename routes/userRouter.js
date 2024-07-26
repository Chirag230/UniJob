import express from "express"
import { Register,login,logout,getUser } from "../controller/userController.js";
import { isAuthorized } from "../middleware/auth.js";
const router  = express.Router();

router.post("/register",Register)
router.post("/login",login)
router.get("/logout",isAuthorized,logout);// logout tabhi jab authorized ho
router.get("/getUser",isAuthorized,getUser)

export default router;