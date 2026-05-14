import express from "express";

import loginTeachersController from "../Controller/loginTeachersController.js"

const router = express.Router();

router.route("/").post(loginTeachersController.login);

export default router;