import db from "../db/queries.js";

let laptopsController = {};

// GET /laptops -> displays all laptops in the DB
async function laptopsGet(req, res) {
    const laptopsList = await db.getAllLaptops();
    res.render("laptops", {
        laptopsList
    });
}

export default laptopsController = {
    laptopsGet,
}