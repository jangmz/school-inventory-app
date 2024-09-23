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

// POST /tablets/new -> inserts a new tablet into DB
async function tabletsNewPost(req, res) {
    // TODO
}

export default tabletsController = {
    tabletsGet,
    tabletsNewGet,
}