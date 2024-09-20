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

// POST /laptops/new -> inserts new laptop into DB
async function laptopsNewPost(req, res) {
    try {
        console.log("Adding new laptop...");

        const newLaptop = req.body;

        // TODO: transfer checking of input data from "queries.js" in to here, send sanitized data
        newLaptop.doc_signed === "on" ? newLaptop.doc_signed = true : newLaptop.doc_signed = false;

        // input data to DB
        await db.insertLaptop(newLaptop);

        console.log("Successfully added.");
    } catch (error) {
        console.log(error);
    }

    res.redirect("../laptops");
}

export default laptopsController = {
    laptopsGet,
    laptopsNewGet,
    laptopsNewPost,
}