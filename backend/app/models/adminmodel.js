var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var estimation=new Schema({
    phone:{ type: String, default: "" },
    email:{ type: String, default: "" },
    name:{ type: String, default: "" },
    area:{ type: String, default: "" },
    coordinates:{ type: String, default: "" },
    material:{ type: String, default: "" },
    slope:{ type: String, default: "" },
    estimatedamount:{ type: String, default: "" },
    slopecost:{ type: String, default: "" },
    materialcost:{ type: String, default: "" },
    labour:{ type: String, default: "" },
    address:{ type: String, default: "" },
    created_date:{type:Date ,default:Date.now }

})
var AdminSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    cratedon: { type: Date, default: Date.now },
    updateon: Date,
    users_det:[estimation]

})

module.exports = mongoose.model('Admin', AdminSchema);