import { Router } from "express";
import { handleData } from "../../controllers/dataHandleController";
import { validateToken } from "../../middlewares";

const router = Router();

router.route("/server/incoming_data").post(validateToken, handleData);

export default router;
