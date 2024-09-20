let laptopsController = {};

// GET /laptops -> displays all laptops in the DB
function laptopsGet(req, res) {

    res.render("laptops");
}

export default laptopsController = {
    laptopsGet,
}