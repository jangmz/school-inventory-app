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

// GET /laptops/:laptopId/update -> dispays a form for updating data of a laptop
async function laptopsUpdateGet(req, res) {
    const laptopIdToUpdate = parseInt(req.params.laptopId);
    const allLaptops = await db.getAllLaptops();
    const updateLaptop = allLaptops.find(laptop => laptop.id === laptopIdToUpdate);

    if (!updateLaptop) {
        return res.status(404).json({msg: `Laptop with ID: ${laptopIdToUpdate} was not found!`});
    }
    
    res.render("updateLaptopForm", {laptopData: updateLaptop});
}

// POST /laptops/update -> updates the data to the DB and redirects to /laptops

export default laptopsController = {
    laptopsGet,
    laptopsNewGet,
    laptopsNewPost,
    laptopsUpdateGet,
}