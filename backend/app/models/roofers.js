var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var estimation = new Schema({
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    name: { type: String, default: "" },
    area: { type: String, default: "" },
    power: { type: String, default: "" },
    e_consumption: { type: String, default: "" },
    coordinates: { type: String, default: "" },
    material: { type: String, default: "" },
    slope: { type: String, default: "" },
    estimatedamount: { type: String, default: "" },
    slopecost: { type: String, default: "" },
    materialcost: { type: String, default: "" },
    labour: { type: String, default: "" },
    address: { type: String, default: "" },
    panel: { type: String, default: "" },
    battery: { type: String, default: "" },
    panelsCount: { type: Number }, 
    created_date: { type: Date, default: Date.now }

})
var RooferSchema = new Schema({
    name: { type: String, default: "" },
    rooferid: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    password: { type: String, default: "" },
    profilepic: { type: String, default: "" },
    cratedon: { type: Date, default: Date.now },
    updateon: Date,
    users_data: [estimation]

})

module.exports = mongoose.model('roofers', RooferSchema);