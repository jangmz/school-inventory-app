import db from "../db/queries.js";

let laptopsController = {};

// function that transforms data into correct formats
function laptopDataCorrection(laptop) {
    laptop.id = laptop.id ? parseInt(laptop.id) : null;
    laptop.user_id = laptop.user_id ? parseInt(laptop.user_id) : null;
    laptop.ram = laptop.ram ? parseInt(laptop.ram) : null;
    laptop.storage = laptop.storage ? parseInt(laptop.storage) : null;
    laptop.doc_signed = laptop.doc_signed === "on" ? true : false;

    return laptop;
}

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

        let newLaptop = req.body;

        newLaptop = laptopDataCorrection(newLaptop);

        // input data to DB
        await db.insertLaptop(newLaptop);

        console.log("Successfully added.");
    } catch (error) {
        console.log(error);
    }

    res.redirect("../laptops");
}

// GET /laptops/update/:laptopId -> dispays a form for updating data of a laptop
async function laptopsUpdateGet(req, res) {
    const laptopIdToUpdate = parseInt(req.params.laptopId);
    const allLaptops = await db.getAllLaptops();
    const updateLaptop = allLaptops.find(laptop => laptop.id === laptopIdToUpdate);

    if (!updateLaptop) {
        return res.status(404).json({msg: `Laptop with ID: ${laptopIdToUpdate} was not found!`});
    }
    
    res.render("updateLaptopForm", {laptopData: updateLaptop});
}

// POST /laptops/update/:laptopId -> updates the data to the DB and redirects to /laptops
async function laptopsUpdatePost(req, res) {
    try {
        console.log("Updating database - laptop table...");
        let updatedLaptopData = req.body;
        updatedLaptopData.id = req.params.laptopId;

        // correct data types
        updatedLaptopData = laptopDataCorrection(updatedLaptopData);

        // update in DB
        await db.updateLaptop(updatedLaptopData);
    } catch (error) {
        console.log(error);
    }

    console.log("Update successfull.");
    res.redirect("/laptops");
}

export default laptopsController = {
    laptopsGet,
    laptopsNewGet,
    laptopsNewPost,
    laptopsUpdateGet,
    laptopsUpdatePost,
}