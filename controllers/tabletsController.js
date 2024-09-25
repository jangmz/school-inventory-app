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
    let newTablet = req.body;
    newTablet = tabletDataCorrection(newTablet);

    // check if ID exists in DB
    const allTablets = await db.getAllTablets();
    const tabletExists = allTablets.find(tablet => tablet.id === newTablet.id);

    if (tabletExists) {
        return res.status(400).json({msg: `Tablet with ID ${newTablet.id} already exists! Choose different ID.`});
    }

    try {
        console.log("Inserting new tablet...");
        await db.insertTablet(newTablet);
    } catch (error) {
        console.log(error);
    }

    console.log("Successfully inserted.");
    res.redirect("/tablets");
}

// GET /tablets/update/:tabletId -> display form for updating data
async function tabletsUpdateGet(req, res) {
    const tabletIdToUpdate = parseInt(req.params.tabletId);
    const allTablets = await db.getAllTablets();
    const tabletToUpdate = allTablets.find(tablet => tablet.id === tabletIdToUpdate);

    if (!tabletToUpdate) {
        return res.status(404).json({msg: `Laptop with ID: ${tabletIdToUpdate} was not found!`});
    }

    res.render("updateTabletForm", {tabletData: tabletToUpdate});
}

// POST /tablets/update/:tabletId -> updating tablet data in db
async function tabletsUpdatePost(req, res) {
    let tablet = req.body;
    tablet.id = req.params.tabletId;
    tablet = tabletDataCorrection(tablet);

    try {
        console.log(`Updating tablet with ID: ${tablet.id}...`);
        await db.updateTablet(tablet);
    } catch (error) {
        console.log(error);
    }

    console.log("Update successfull.");
    res.redirect("/tablets");
}

// POST /tablets/delete/:tabletId -> deleting tablet in DB
async function tabletsDeletePost(req, res) {
    const tabletId = parseInt(req.params.tabletId);

    try {
        console.log(`Deleting tablet with ID: ${tabletId}...`);
        await db.deleteTablet(tabletId);
    } catch (error) {
        console.log(error);
    }

    console.log("Delete successfull.");
    res.redirect("/tablets");
}

export default tabletsController = {
    tabletsGet,
    tabletsNewGet,
    tabletsNewPost,
    tabletsUpdateGet,
    tabletsUpdatePost,
    tabletsDeletePost,
}