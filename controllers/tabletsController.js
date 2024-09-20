import db from "../db/queries.js";

let tabletsController = {};

// GET /tablets -> displays all tablets data
 async function tabletsGet(req, res) {
    const tabletsList = await db.getAllTablets();
    res.render("tablets", {
        tabletsList
    });
}

export default tabletsController = {
    tabletsGet,
}