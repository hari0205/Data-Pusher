import { Router } from "express";
import {
  createDestination,
  deleteDestination,
  getAllDestinations,
  updateDestination,
} from "../../controllers";

const router = Router();

router.route("").post(createDestination);
router.route("/:account_id").get(getAllDestinations);
router.route("/:id").put(updateDestination);
router.route("/:id").delete(deleteDestination);

export default router;
