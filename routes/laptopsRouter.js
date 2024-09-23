import { Router } from "express";
import laptopsController from "../controllers/laptopsController.js";

const laptopsRouter = Router();

laptopsRouter.get("/", laptopsController.laptopsGet);
laptopsRouter.get("/new", laptopsController.laptopsNewGet);
laptopsRouter.post("/new", laptopsController.laptopsNewPost);
laptopsRouter.get("/update/:laptopId", laptopsController.laptopsUpdateGet);

export default laptopsRouter;