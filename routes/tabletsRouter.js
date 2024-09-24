import { Router } from "express";
import tabletsController from "../controllers/tabletsController.js";

const tabletsRouter = Router();

tabletsRouter.get("/", tabletsController.tabletsGet);
tabletsRouter.get("/new", tabletsController.tabletsNewGet);
tabletsRouter.post("/new", tabletsController.tabletsNewPost);

export default tabletsRouter;