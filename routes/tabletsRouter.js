import { Router } from "express";

const tabletsRouter = Router();

tabletsRouter.get("/", (req, res) => {
    res.render("tablets");
});

export default tabletsRouter;