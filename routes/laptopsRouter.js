import { Router } from "express";
import multer from "multer";
import laptopsController from "../controllers/laptopsController.js";

const laptopsRouter = Router();

// destination folder for uploaded files
const upload = multer({dest: "uploads"});

laptopsRouter.get("/", laptopsController.laptopsGet);
laptopsRouter.get("/new", laptopsController.laptopsNewGet);
laptopsRouter.post("/new", laptopsController.laptopsNewPost);
laptopsRouter.get("/update/:laptopId", laptopsController.laptopsUpdateGet);
laptopsRouter.post("/update/:laptopId", laptopsController.laptopsUpdatePost);
laptopsRouter.post("/delete/:laptopId", laptopsController.laptopsDeletePost);
laptopsRouter.get("/upload-data", laptopsController.laptopsUploadDataGet);
laptopsRouter.post("/upload-data", upload.single("csvfile"), laptopsController.laptopsUploadDataPost);

export default laptopsRouter;