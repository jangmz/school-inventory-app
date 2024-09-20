import { Router } from "express";
import laptopsController from "../controllers/laptopsController";

const laptopsRouter = Router();

laptopsRouter.get("/", laptopsController.laptopsGet);

export default laptopsRouter;