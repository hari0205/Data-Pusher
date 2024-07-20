import { Router } from "express";
import {
  createAccount,
  getAccount,
  getAllAccounts,
  updateAccount,
  deleteAccount,
} from "../../controllers";
import { validateSchema } from "../../middlewares";
import { createAccountSchema, updateAccountSchema } from "../../schema";

const router: Router = Router();

router.route("/").post(validateSchema(createAccountSchema), createAccount);
router.route("/").get(getAllAccounts);
router.route("/:account_id").get(getAccount);
router
  .route("/:account_id")
  .put(validateSchema(updateAccountSchema), updateAccount);
router.route("/:account_id").delete(deleteAccount);

export default router;
