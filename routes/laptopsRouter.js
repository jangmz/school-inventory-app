import { Router } from "express";
// import laptopsController from "../controllers/laptopsController.js"

const laptopsRouter = Router();

laptopsRouter.get("/", (req, res) => {
    res.render("laptops");
});

export default laptopsRouter;