import pool from "./pool.js";

/*
    ========== TABLET QUERIES ==========
*/

// get all tablets from DB
async function getAllTablets() {
    const {rows} = await pool.query("SELECT * FROM tablets ORDER BY id;");
    return rows;
}

// insert new tablet in to DB
async function insertTablet(tablet) {
    console.log("Inserting tablet to DB...");

    try {
        await pool.query(`
            INSERT INTO tablets(id, model, status, user_id, notes, doc_signed)
            VALUES($1, $2, $3, $4, $5, $6);
        `, [
            tablet.id, 
            tablet.model, 
            tablet.status, 
            tablet.user_id, 
            tablet.notes, 
            tablet.doc_signed
        ]);
    } catch (error) {
        console.log(error);
    }
    
    console.log("Inserted.");
}

// update tablet data
async function updateTablet(tablet) {
    console.log("Updating tablet DB...");

    try {
        await pool.query(
            `UPDATE tablets
            SET model=$1, status=$2, user_id=$3, notes=$4, doc_signed=$5
            WHERE id=$6;`
        , [
            tablet.model,
            tablet.status,
            tablet.user_id,
            tablet.notes,
            tablet.doc_signed,
            tablet.id
        ]);
    } catch (error) {
        console.log(error);
    }

    console.log("Updated.");
}

// deleting tablet
async function deleteTablet(tabletId) {
    console.log("Tablet deletion from DB in progress...");

    try {
        await pool.query(
            `DELETE FROM tablets WHERE id=$1;`
        , [tabletId]);
    } catch (error) {
        console.log(error);
    }

    console.log("Deleted.");
}

// number of total laptops
async function totalTablets(){
    const {rows} = await pool.query(`
        SELECT COUNT(*) as total 
        FROM tablets;
        `);
    return rows;
}

// number of available laptops
async function availableTablets() {
    const {rows} = await pool.query(`
            SELECT COUNT(id) as available 
            FROM tablets
            WHERE status='Available';
        `);
    return rows;
}

// number of taken laptops (not available + temporary unavailable)
async function unavailableTablets() {
    const {rows} = await pool.query(`
            SELECT COUNT(id) as unavailable
            FROM tablets
            WHERE status='Not available' OR status='Temporary unavailable';
        `);
    return rows;
}

// number of laptops with unknown location status
async function unknownLocationTablets() {
    const {rows} = await pool.query(`
        SELECT COUNT(id) as unknown
        FROM tablets
        WHERE status='Unknown location';
        `);
    return rows;
}

// number of reserved laptops
async function reservedTablets() {
    const {rows} = await pool.query(`
        SELECT COUNT(id) as reserved
        FROM tablets
        WHERE status='Reserved';
        `);
    return rows;
}

// number of damaged and laptops not in use
async function notInUseTablets() {
    const {rows} = await pool.query(`
        SELECT COUNT(id) as damaged
        FROM tablets
        WHERE status='Damaged' OR status='Not in use';
        `);
    return rows;
}

/*
    ========== LAPTOP QUERIES ==========
*/

// get all laptops from DB
async function getAllLaptops() {
    const { rows } = await pool.query("SELECT * FROM laptops ORDER BY id;");
    return rows;
}

// insert new laptop in to DB
async function insertLaptop(laptop) {
    console.log("Inserting laptop in progress...");

    try {
        await pool.query(`
            INSERT INTO laptops(id, model, status, user_id, doc_signed, cpu, ram, storage, notes)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);   
        `, [
            laptop.id,
            laptop.model,
            laptop.status,
            laptop.user_id,
            laptop.doc_signed,
            laptop.cpu,
            laptop.ram,
            laptop.storage,
            laptop.notes
        ]);
    } catch (error) {
        console.log(error);
    }
    
    console.log("Inserted.");
}

// update laptop data
async function updateLaptop(laptop) {
    console.log("Updating laptop data...");
    try {
        await pool.query(
            `UPDATE laptops
            SET model=$1, status=$2, user_id=$3, doc_signed=$4, cpu=$5, ram=$6, storage=$7, notes=$8
            WHERE id=$9;`,
            [
                laptop.model, 
                laptop.status, 
                laptop.user_id, 
                laptop.doc_signed, 
                laptop.cpu, 
                laptop.ram, 
                laptop.storage, 
                laptop.notes, 
                laptop.id
            ]
        );
    } catch (error) {
        console.log(error);
    }

    console.log("Updated.");
}

// delete laptop entry
async function deleteLaptop(laptopId) {
    console.log("Deleting laptop in progress...");

    try {
        await pool.query(
            `DELETE FROM laptops WHERE id=$1;`
        , [laptopId]);
    } catch (error) {
        console.log(error);
    }

    console.log("Deleted.");
}

// number of total laptops
async function totalLaptops(){
    const {rows} = await pool.query(`
        SELECT COUNT(*) as total 
        FROM laptops;
        `);
    return rows;
}

// number of available laptops
async function availableLaptops() {
    const {rows} = await pool.query(`
            SELECT COUNT(id) as available 
            FROM laptops
            WHERE status='Available';
        `);
    return rows;
}

// number of taken laptops (not available + temporary unavailable)
async function unavailableLaptops() {
    const {rows} = await pool.query(`
            SELECT COUNT(id) as unavailable
            FROM laptops
            WHERE status='Not available' OR status='Temporary unavailable';
        `);
    return rows;
}

// number of laptops with unknown location status
async function unknownLocationLaptops() {
    const {rows} = await pool.query(`
        SELECT COUNT(id) as unknown
        FROM laptops
        WHERE status='Unknown location';
        `);
    return rows;
}

// number of reserved laptops
async function reservedLaptops() {
    const {rows} = await pool.query(`
        SELECT COUNT(id) as reserved
        FROM laptops
        WHERE status='Reserved';
        `);
    return rows;
}

// number of damaged and laptops not in use
async function notInUseLaptops() {
    const {rows} = await pool.query(`
        SELECT COUNT(id) as damaged
        FROM laptops
        WHERE status='Damaged' OR status='Not in use';
        `);
    return rows;
}

export default {
    getAllLaptops,
    getAllTablets,
    insertTablet,
    updateTablet,
    deleteTablet,
    totalTablets,
    availableTablets,
    unavailableTablets,
    unknownLocationTablets,
    reservedTablets,
    notInUseTablets,
    insertLaptop,
    updateLaptop,
    deleteLaptop,
    totalLaptops,
    availableLaptops,
    unavailableLaptops,
    unknownLocationLaptops,
    reservedLaptops,
    notInUseLaptops
}