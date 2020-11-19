const router = require("express").Router();
let Catalog = require("../models/catalog.model");

router.route("/").get((request, response) => {
    Catalog.find()
        .then((items) => response.json(items))
        .catch((err) => response.status(400).json("Error: " + err));
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
