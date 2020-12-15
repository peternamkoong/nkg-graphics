const router = require("express").Router();
let Catalog = require("../models/catalog.model");

router.route("/").get((request, response) => {
    Catalog.find()
        .then((items) => response.json(items))
        .catch((err) => response.status(400).json("Error: " + err));
});

router.route("/getAllTypes").get((request, response) => {
    Catalog.find({ type: request.query.type })
        .then((items) => response.json(items))
        .catch((err) => response.status(400).json("Cannot find"));
});

router.route("/getFilteredType").get((request, response) => {
    if (request.query.category === "" || request.query.category === undefined) {
        Catalog.find({ type: request.query.type })
            .then((items) => response.json(items))
            .catch((err) => response.status(400).json("Cannot find"));
    } else {
        Catalog.find({ type: request.query.type, category: request.query.category })
            .then((items) => response.json(items))
            .catch((err) => response.status(400).json("Cannot find"));
    }
});

router.route("/getCatalogItem").get((request, response) => {
    Catalog.findById(request.query.id)
        .then((item) => response.json(item))
        .catch((err) => response.status(400).json("Cannot find item"));
});

router.route("/add").post((request, response) => {
    const catalogItem = request.body;
    const newCatalogItem = new Catalog(catalogItem);
    newCatalogItem
        .save()
        .then(() => response.json("Catalog Item added!"))
        .catch((err) => response.status(400).json("Error adding new catalog item. Err: " + err));
});

router.route("/:id").get((request, response) => {
    Catalog.findById(request.params.id)
        .then((item) => response.json(item))
        .catch((err) => response.status(400).json("Error loading item: " + err));
});

module.exports = router;
