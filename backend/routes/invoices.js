const router = require("express").Router();
let Invoices = require("../models/invoices.model");
let Users = require("../models/users.model");

router.route("/").get((request, response) => {
    Users.find(request.body.UserID)
        .then((user) =>
            Invoices.find({ user: user }).then((invoices) =>
                response.json(invoices).catch((err) => response.status(400).json("Invoice Err: " + err))
            )
        )
        .catch((err) => response.status(400).json("User could not be found. Err: " + err));
});
router.route("/add").post((request, response) => {
    const InvoiceObject = request.body.invoice;

    const newInvoice = new Invoices(userObject);

    newInvoice
        .save()
        .then(() => response.json("Invoice added!"))
        .catch((err) => response.status(400).json("error adding new Invoice. Err: " + err));
});
router.route("/:id").get((request, response) => {
    Invoices.findById(request.params.id)
        .then((invoice) => response.json(invoice))
        .catch((err) => response.status(400).json("Error loading invoice. Err: " + err));
});

module.exports = router;
