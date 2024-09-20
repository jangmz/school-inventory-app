import db from "../db/queries.js";

let laptopsController = {};

// GET /laptops -> displays all laptops in the DB
async function laptopsGet(req, res) {
    const laptopsList = await db.getAllLaptops();
    res.render("laptops", {
        laptopsList
    });
}

// GET /laptops/new -> displays form for inserting a new laptop into DB
function laptopsNewGet(req, res) {
    res.render("newLaptopForm");
}

export default laptopsController = {
    laptopsGet,
    laptopsNewGet,
}