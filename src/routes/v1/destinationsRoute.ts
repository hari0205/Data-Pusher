import { Router } from "express";
import {
  createDestination,
  deleteDestination,
  getAllDestinations,
  updateDestination,
} from "../../controllers";
import { validateSchema } from "../../middlewares";
import { createDestinationSchema, updateDestinationSchema } from "../../schema";

const router = Router();

router
  .route("")
  .post(validateSchema(createDestinationSchema), createDestination);
router.route("/:account_id").get(getAllDestinations);
router
  .route("/:id")
  .put(validateSchema(updateDestinationSchema), updateDestination);
router.route("/:id").delete(deleteDestination);

export default router;
