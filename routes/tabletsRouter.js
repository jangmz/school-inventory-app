import { Router } from "express";
import tabletsController from "../controllers/tabletsController.js";

const tabletsRouter = Router();

tabletsRouter.get("/", tabletsController.tabletsGet);
tabletsRouter.get("/new", tabletsController.tabletsNewGet);
// TODO: tabletsRouter.post("/new", tabletsController.tablets);

export default tabletsRouter;