import db from "../db/queries.js";

let tabletsController = {};

// function that transforms data into correct formats
function tabletDataCorrection(tablet) {
    tablet.id = tablet.id ? parseInt(tablet.id) : null;
    tablet.user_id = tablet.user_id ? parseInt(tablet.user_id) : null;
    tablet.doc_signed = tablet.doc_signed === "on" ? true : false;

    return tablet;
}

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
    try {
        console.log("Inserting new tablet...");
        let newTablet = req.body;
        newTablet = tabletDataCorrection(newTablet);
        console.log(newTablet);
        await db.insertTablet(newTablet);
    } catch (error) {
        console.log(error);
    }

    console.log("Successfully inserted.");
    res.redirect("/tablets");
}

export default tabletsController = {
    tabletsGet,
    tabletsNewGet,
    tabletsNewPost,
}