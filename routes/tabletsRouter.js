import { Router } from "express";
import tabletsController from "../controllers/tabletsController.js";

const tabletsRouter = Router();

tabletsRouter.get("/", tabletsController.tabletsGet);
tabletsRouter.get("/new", tabletsController.tabletsNewGet);
tabletsRouter.post("/new", tabletsController.tabletsNewPost);
tabletsRouter.get("/update/:tabletId", tabletsController.tabletsUpdateGet);
tabletsRouter.post("/update/:tabletId", tabletsController.tabletsUpdatePost);

export default tabletsRouter;