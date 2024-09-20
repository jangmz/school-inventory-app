import db from "../db/queries.js";

let tabletsController = {};

// GET /tablets -> displays all tablets data
 async function tabletsGet(req, res) {
    const tabletsList = await db.getAllTablets();
    res.render("tablets", {
        tabletsList
    });
}

// GET /tablets/new -> displays form for inserting a new tablet into DB
function tabletsNewGet(req, res) {
    res.render("newTabletForm");
}

export default tabletsController = {
    tabletsGet,
    tabletsNewGet,
}