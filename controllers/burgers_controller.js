// Dependencies
//deploy
var express = require("express");
// Import model to use db functions for burger.js
var burger = require("../models/burger.js");

// Create router for app, export router at the end of file.
var router = express.Router();
// Create routes and set up logic where required.
router.get("/", function (req, res) {
    burger.displayAll(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});
// Add new burger to db.
router.post("/api/burgers", function (req, res) {
    burger.insert(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result) {
        // Send back ID of new burger
        res.json({ id: result.insertId });
    });
});
// Set devoured status to true.
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({ devoured: req.body.devoured }, condition, function(result) {
        if (result.changedRows === 0) {
            // If no rows changed, ID does not exist, 404.
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
// Delete burger from db.
router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.delete(condition, function(result) {
        if (result.changedRows === 0) {
            // If no rows changed, ID does not exist, 404.
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;