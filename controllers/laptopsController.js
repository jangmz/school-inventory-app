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
    let newLaptop = req.body;
    newLaptop = laptopDataCorrection(newLaptop);

    // check if ID already exists in the DB
    const allLaptops = await db.getAllLaptops();
    const laptopExists = allLaptops.find(laptop => laptop.id === newLaptop.id);

    if (laptopExists) {
        return res.status(400).json({msg: `Laptop with ID ${newLaptop.id} already exists! Choose new ID.`});
    }

    // insert data into DB
    try {
        console.log("Adding new laptop...");
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

// POST /laptop/delete/:laptopId -> deletes laptop data in DB
async function laptopsDeletePost(req, res) {
    try {
        const laptopId = req.params.laptopId;
        console.log(`Deleting laptop with ID: ${laptopId}...`);
        await db.deleteLaptop(laptopId);
    } catch (error) {
        console.log(error);
    }
    console.log("Successfully deleted.");
    res.redirect("/laptops");
}

export default laptopsController = {
    laptopsGet,
    laptopsNewGet,
    laptopsNewPost,
    laptopsUpdateGet,
    laptopsUpdatePost,
    laptopsDeletePost,
}