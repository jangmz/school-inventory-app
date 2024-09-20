import { Router } from "express";
import tabletsController from "../controllers/tabletsController.js";

const tabletsRouter = Router();

tabletsRouter.get("/", tabletsController.tabletsGet);

export default tabletsRouter;