var secretkey = require("../../config.json");
var jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {

    console.log(req);

    jwt.verify(req.body.token, secretkey.secrettoken, function (err, decod) {

        if (err) {
            res.send("invalid token");
        } else {
            next();
        }

    })
}