var mongoose = require("mongoose");
//var increment=require("mongoose-auto-increment")
var Schema = mongoose.Schema;

var estimation = new Schema({
    area: { type: String, default: "" },
    coordinates: { type: String, default: "" },
    material: { type: String, default: "" },
    slope: { type: String, default: "" },
    estimatedamount: { type: String, default: "" },
    slopecost: { type: String, default: "" },
    materialcost: { type: String, default: "" },
    labour: { type: String, default: "" },
    address: { type: String, default: "" },
    property_type: { type: String, default: "" },
    floors: { type: String, default: "" },
    roof_pitch: { type: String, default: "" },
    power: { type: String, default: "" },
    e_consumption: { type: String, default: "" },
    created_date: { type: Date, default: Date.now },
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
})

var timings = new Schema({

    date: { type: String, default: "" },
    time: { type: String, default: "" },
    created_date: { type: Date, default: Date.now }


})

var UserSchema = new Schema({
    name: { type: String, default: "" },
    phone: { type: String, default: "" },
    Password: { type: String, default: "" },
    email: { type: String, default: "" },
    profilepic: { type: String, default: "" },
    cratedon: { type: String, default: "" },
    updateon: { type: String, default: "" },
    businessname: { type: String, default: "" },
    website: { type: String, default: "" },
    address: { type: String, default: "" },
    organization_number: { type: String, default: "" },
    type: String,
    estdet: [estimation],
    connecttime: [timings]



})

module.exports = mongoose.model('Users', UserSchema);