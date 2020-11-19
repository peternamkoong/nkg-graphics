const router = require("express").Router();
let User = require("../models/users.model");

router.route("/").get((request, response) => {
    User.find()
        .then((users) => response.json(users))
        .catch((err) => response.status(400).json("Error: " + err));
});

router.route("/add").post((request, response) => {
    const userObject = request.body;
    const newUser = new User(userObject);

    newUser
        .save()
        .then(() => response.json("User added!"))
        .catch((err) => response.status(400).json);
});

module.exports = router;
