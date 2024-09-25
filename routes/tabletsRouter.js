import { Router } from "express";
import tabletsController from "../controllers/tabletsController.js";
import multer from "multer";

const tabletsRouter = Router();

// destination folder for uploaded files
const upload = multer({dest: "uploads"});

tabletsRouter.get("/", tabletsController.tabletsGet);
tabletsRouter.get("/new", tabletsController.tabletsNewGet);
tabletsRouter.post("/new", tabletsController.tabletsNewPost);
tabletsRouter.get("/update/:tabletId", tabletsController.tabletsUpdateGet);
tabletsRouter.post("/update/:tabletId", tabletsController.tabletsUpdatePost);
tabletsRouter.post("/delete/:tabletId", tabletsController.tabletsDeletePost);
tabletsRouter.get("/upload-data", tabletsController.tabletsUploadDataGet);
tabletsRouter.post("/upload-data", upload.single("csvfile"), tabletsController.tabletsUploadDataPost);

export default tabletsRouter;