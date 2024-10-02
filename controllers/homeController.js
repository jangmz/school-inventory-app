import db from "../db/queries.js";

// GET / -> home page displaying current stock statistics
async function statisticsLaptopsGet(req, res) {
    console.log("Gathering data...");
    const totalLaptops = await db.totalLaptops();
    const availableLaptops = await db.availableLaptops();
    const unavailableLaptops = await db.unavailableLaptops();
    const unknownLocationLaptops = await db.unknownLocationLaptops();
    const reservedLaptops = await db.reservedLaptops();
    const notInUseLaptops = await db.notInUseLaptops();
    console.log("Finished.");

    res.render("index", {
        totalLaptops,
        availableLaptops,
        unavailableLaptops,
        unknownLocationLaptops,
        reservedLaptops,
        notInUseLaptops
    });
}

export default {
    statisticsLaptopsGet,
}