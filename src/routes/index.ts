import { Router } from "express";
import accountsRouter from "./v1/accountsRoute";
import destinationsRouter from "./v1/destinationsRoute";

const v1router = Router();
const defaultRoutes = [
  {
    path: "/accounts",
    router: accountsRouter,
  },
  {
    path: "/destinations",
    router: destinationsRouter
  }

];

defaultRoutes.forEach((route) => {
  v1router.use(route.path, route.router);
});

export default v1router;
