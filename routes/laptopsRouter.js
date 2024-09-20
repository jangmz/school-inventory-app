import { Router } from "express";
import laptopsController from "../controllers/laptopsController.js";

const laptopsRouter = Router();

laptopsRouter.get("/", laptopsController.laptopsGet);

export default laptopsRouter;