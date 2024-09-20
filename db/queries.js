import pool from "./pool.js";

// get all laptops from DB
async function getAllLaptops() {
    const { rows } = await pool.query("SELECT * FROM laptops;");
    return rows;
}

// get all tablets from DB
async function getAllTablets() {
    const {rows} = await pool.query("SELECT * FROM tablets;");
    return rows;
}

// insert new laptop in to DB
async function insertLaptop(laptop) {
    await pool.query(`
        INSERT INTO laptops(id, model, status, user_id, doc_signed, cpu, ram, storage, notes)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);   
    `, [laptop.id, laptop.model, laptop.status, laptop.user_id, laptop.doc_signed, laptop.cpu, laptop.ram, laptop.storage, laptop.notes]);
}

// insert new tablet in to DB
async function insertTablet(tablet) {
    await pool.query(`
        INSERT INTO tablets(id, model, status, user_id, notes, doc_signed)
        VALUES($1, $2, $3, $4, $5, $6);
    `, [tablet.id, tablet.model, tablet.status, tablet.user_id, tablet.notes, tablet.doc_signed]);
}

export default {
    getAllLaptops,
    getAllTablets,
    insertLaptop
}