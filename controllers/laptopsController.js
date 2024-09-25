import db from "../db/queries.js";
import csv from "csv-parser";
import fs from "fs";

let laptopsController = {};

// transforms data into correct formats
function laptopDataCorrection(laptop) {
    laptop.id = laptop.id ? parseInt(laptop.id) : null;
    laptop.user_id = laptop.user_id ? parseInt(laptop.user_id) : null;
    laptop.ram = laptop.ram ? parseInt(laptop.ram) : null;
    laptop.storage = laptop.storage ? parseInt(laptop.storage) : null;
    laptop.doc_signed = laptop.doc_signed === "on" ? true : false;

    return laptop;
}

// transforms keys into lowercase
function keysToLowerCase(data) {
    const convertedData = {};
    for(const key in data) {
        convertedData[key.toLowerCase()] = data[key];
    }

    return convertedData;
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

// GET /upload-data -> form for uploading csv file of data
async function laptopsUploadDataGet(req, res) {
    res.render("uploadLaptopDataForm");
}

// POST /upload-data -> uploads data to DB
async function laptopsUploadDataPost(req, res) {
    const results = [];
    const filePath = req.file.path;
    let rowsInserted = 0;

    // Open stream to read file and collect rows in results array
    console.log("Reading file...");
    try {
        await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on("data", row => {
                    results.push(row); // data is OK
                })
                .on("end", resolve)
                .on("error", reject);
        });
    } catch (error) {
        console.error("Error reading CSV file:", error);
        return res.status(500).json({msg: "Error reading file."});
    }

    // transform data into correct formats
    const correctedResults = [];
    results.map(row => {
        let convertedRow = keysToLowerCase(row);
        convertedRow = laptopDataCorrection(convertedRow);
        correctedResults.push(convertedRow);
    });

    console.log("Started inserting data...");

    try {
        // inserting all rows with data correction
        await Promise.all(correctedResults.map(async row => {
            row = laptopDataCorrection(row);
            await db.insertLaptop(row);
            rowsInserted++;
        }));

        // Delete the file after processing
        fs.unlinkSync(filePath);

        console.log(`Finished: ${rowsInserted} rows inserted.`);
        res.redirect("/laptops");
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ msg: "Error processing file. Check error logs." });
    }
}

export default laptopsController = {
    laptopsGet,
    laptopsNewGet,
    laptopsNewPost,
    laptopsUpdateGet,
    laptopsUpdatePost,
    laptopsDeletePost,
    laptopsUploadDataGet,
    laptopsUploadDataPost,
}