import { Router } from "express";
import { createAccount, getAccount, getAllAccounts, updateAccount , deleteAccount } from "../../controllers";

const router: Router = Router();

router.route("/").post(createAccount);
router.route("/").get(getAllAccounts);
router.route("/:account_id").get(getAccount);
router.route("/:account_id").put(updateAccount);
router.route("/:account_id").delete(deleteAccount);

export default router;
