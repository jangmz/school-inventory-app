import pool from "./pool.js";

// get all laptops from DB
async function getAllLaptops() {
    const { rows } = await pool.query("SELECT * FROM laptops ORDER BY id;");
    return rows;
}

// get all tablets from DB
async function getAllTablets() {
    const {rows} = await pool.query("SELECT * FROM tablets ORDER BY id;");
    return rows;
}

// insert new laptop in to DB
async function insertLaptop(laptop) {
    await pool.query(`
        INSERT INTO laptops(id, model, status, user_id, doc_signed, cpu, ram, storage, notes)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);   
    `, [
        parseInt(laptop.id),
        laptop.model,
        laptop.status,
        laptop.user_id ? parseInt(laptop.user_id) : null,
        laptop.doc_signed,
        laptop.cpu,
        laptop.ram ? parseInt(laptop.ram) : null,
        laptop.storage ? parseInt(laptop.storage) : null,
        laptop.notes
    ]);
}

// insert new tablet in to DB
async function insertTablet(tablet) {
    await pool.query(`
        INSERT INTO tablets(id, model, status, user_id, notes, doc_signed)
        VALUES($1, $2, $3, $4, $5, $6);
    `, [tablet.id, tablet.model, tablet.status, tablet.user_id, tablet.notes, tablet.doc_signed]);
}

// update laptop data
async function updateLaptop(laptop) {
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
}

export default {
    getAllLaptops,
    getAllTablets,
    insertLaptop,
    insertTablet,
    updateLaptop,
}