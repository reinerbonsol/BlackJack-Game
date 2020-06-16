var db = require("../models");

module.exports = function(app) {

    app.get("/api/user", function(req, res) {
        db.User.findAll({}).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.post("/api/user", function(req, res) {
        db.User.create({
            username: req.body.username,
        }).then(function(dbUser) {
            // res.json(dbUser);
            res.redirect("/game");
        }).catch(function(err) {
        res.json(err);
        });
    });

}