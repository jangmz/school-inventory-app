let tabletsController = {};

// GET /tablets -> displays all tablets data
function tabletsGet(req, res) {
    res.render("tablets");
}

export default tabletsController = {
    tabletsGet,
}