const router = require("express").Router();
const { useRef } = require("react");
let User = require("../models/users.model");

router.route("/").get((request, response) => {
    User.find()
        .then((users) => response.json(users))
        .catch((err) => response.status(400).json("Error: " + err));
});

router.route("/add").post((request, response) => {
    const userObject = request.body.form;
    const newUser = new User(userObject);

    newUser
        .save()
        .then(() => response.json("User added!"))
        .catch((err) => response.status(400).json);
});

router.route("/getLoggedInUser").get((request, response) => {
    console.log(request.query.password);
    User.find({ email: request.query.email, password: request.query.password })
        .then((user) => response.json(user))
        .catch((err) => response.status(400).json(err));
});

router.route("/getUser").get((request, response) => {
    User.find({ email: request.query.email })
        .then((user) => response.json(user))
        .catch((err) => response.status(400).json(err));
});

router.route("/updateAccount").put((request, response) => {
    console.log(request.body);
    var newValues = {
        $set: {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            phoneNumber: request.body.phoneNumber,
            password: request.body.password,
        },
    };
    User.updateOne({ _id: request.body.id }, newValues, function (err, res) {
        if (err) {
            response.json(err);
        } else {
            response.json("updated");
        }
    });
});

router.route("/updateBilling").put((request, response) => {
    console.log(request.body);
    var newValues = {
        $set: {
            billingAddress: request.body.billingAddress,
        },
    };
    User.updateOne({ _id: request.body.id }, newValues, function (err, res) {
        if (err) {
            response.json(err);
        } else {
            response.json("updated");
        }
    });
});

router.route("/updatePayment").put((request, response) => {
    console.log(request.body);
    var newValues = {
        $set: {
            paymentMethod: request.body.paymentMethod,
        },
    };
    User.updateOne({ _id: request.body.id }, newValues, function (err, res) {
        if (err) {
            response.json(err);
        } else {
            response.json("updated");
        }
    });
});

module.exports = router;
