import db from "../db/queries.js";

// GET / -> home page displaying current stock statistics
async function statisticsLaptopsGet(req, res) {
    const totalLaptops = await db.totalLaptops();
    const availableLaptops = await db.availableLaptops();
    const unavailableLaptops = await db.unavailableLaptops();
    const unknownLocationLaptops = await db.unknownLocationLaptops();
    const reservedLaptops = await db.reservedLaptops();
    const notInUseLaptops = await db.notInUseLaptops();

    const totalTablets = await db.totalTablets();
    const availableTablets = await db.availableTablets();
    const unavailableTablets = await db.unavailableTablets();
    const unknownLocationTablets = await db.unknownLocationTablets();
    const reservedTablets = await db.reservedTablets();
    const notInUseTablets = await db.notInUseTablets();

    res.render("index", {
        totalLaptops,
        availableLaptops,
        unavailableLaptops,
        unknownLocationLaptops,
        reservedLaptops,
        notInUseLaptops,
        totalTablets,
        availableTablets,
        unavailableTablets,
        unknownLocationTablets,
        reservedTablets,
        notInUseTablets
    });
}

export default {
    statisticsLaptopsGet,
}