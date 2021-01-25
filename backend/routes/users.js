const router = require("express").Router();
const { useRef } = require("react");
let User = require("../models/users.model");
var fs = require("fs");

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
    // console.log(request.query.password);
    User.find({ email: request.query.email, password: request.query.password })
        .then((user) => response.json(user))
        .catch((err) => response.status(400).json(err));
});

router.route("/getUser").get((request, response) => {
    User.find({ email: request.query.email })
        .then((user) => response.json(user))
        .catch((err) => response.status(400).json(err));
});

router.route("/getOrder").get((request, response) => {
    // console.log(request.query.orderNumber);
    User.find({ email: request.query.email })
        .then((user) => {
            const userOrders = user[0].orders;
            const order = userOrders.filter((v) => v.orderNumber == request.query.orderNumber);
            console.log(order);
            response.json(order);
        })
        .catch((err) => response.status(400).json(err));
});

router.route("/updateAccount").put((request, response) => {
    // console.log(request.body);
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
    // console.log(request.body);
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
    // console.log(request.body);
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

router.route("/updateCustomOrders").put((request, response) => {
    let orderNumber = 0;
    fs.readFile("orderNumber.txt", function (err, buf) {
        orderNumber = parseInt(buf.toString());
    });
    User.find({ email: request.body.email }).then((user) => {
        let orderArray = user[0].orders;
        let orderQuantity = 0;
        let orderTotal = "CUSTOM";
        let orderDate = new Date();
        request.body.order.forEach((section) => {
            orderQuantity += parseInt(section.quantity);
        });
        orderArray.push({
            billingAddress: user[0].billingAddress,
            paymentMethod: user[0].paymentMethod,
            orderTotal: orderTotal,
            totalQuantity: orderQuantity,
            orderDate: orderDate.toLocaleDateString("en-US"),
            orderNumber: orderNumber,
            details: request.body.order,
        });
        var newValues = {
            $set: {
                orders: orderArray,
            },
        };
        User.updateOne({ email: request.body.email }, newValues, function (err, res) {
            if (err) {
                response.json(err);
            } else {
                response.json(orderNumber);
                orderNumber = "" + (orderNumber + 1);
                fs.writeFile("orderNumber.txt", orderNumber, (err) => {
                    if (err) console.log(err);
                    console.log("Successfully Written to File.");
                });
            }
        });
    });
});

router.route("/updateCatalogOrders").put((request, response) => {
    let orderNumber = 0;
    fs.readFile("orderNumber.txt", function (err, buf) {
        orderNumber = parseInt(buf.toString());
    });
    User.find({ email: request.body.email }).then((user) => {
        let orderArray = user[0].orders;
        let orderQuantity = request.body.order.orderQuantity;
        let orderTotal = request.body.order.orderTotal;
        let orderDate = new Date();

        orderArray.push({
            billingAddress: request.body.order.billingAddress,
            paymentMethod: request.body.order.paymentMethod,
            orderTotal: orderTotal,
            totalQuantity: orderQuantity,
            orderDate: orderDate.toLocaleDateString("en-US"),
            orderNumber: orderNumber,
            details: request.body.cart,
        });

        var newValues = {
            $set: {
                orders: orderArray,
            },
        };
        User.updateOne({ email: request.body.email }, newValues, function (err, res) {
            if (err) {
                response.json(err);
            } else {
                response.json(orderNumber);
                orderNumber = "" + (orderNumber + 1);
                fs.writeFile("orderNumber.txt", orderNumber, (err) => {
                    if (err) console.log(err);
                    console.log("Successfully Written to File.");
                });
            }
        });
    });
});

module.exports = router;
