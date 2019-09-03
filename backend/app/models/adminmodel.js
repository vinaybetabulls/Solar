var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var estimation = new Schema({
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    name: { type: String, default: "" },
    area: { type: String, default: "" },
    coordinates: { type: String, default: "" },
    material: { type: String, default: "" },
    slope: { type: String, default: "" },
    estimatedamount: { type: String, default: "" },
    power: { type: String, default: "" },
    e_consumption: { type: String, default: "" },
    slopecost: { type: String, default: "" },
    materialcost: { type: String, default: "" },
    labour: { type: String, default: "" },
    address: { type: String, default: "" },
    panel: { type: String, default: "" },
    battery: { type: String, default: "" },
    panelsCount: { type: Number },
    solar_installation_cost: { type: Number },
    supervisor_commission: { type: Number },
    digisolar_commission: { type: Number },
    solar_installation_With_commission: { type: Number },
    solar_installation_after_tax: { type: Number },
    display_cost: { type: Number },
    solar_incentives: { type: Number },
    battery_cost: { type: Number },
    battery_cost_after_tax: { type: Number },
    battery_incentives: { type: Number },
    solar_intallation_after_commission: { type: Number },
    battery_after_incentives: { type: Number },
    final_cost: { type: Number },
    created_date: { type: Date, default: Date.now }

})
var AdminSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    cratedon: { type: Date, default: Date.now },
    updateon: Date,
    users_det: [estimation]

})

module.exports = mongoose.model('Admin', AdminSchema);