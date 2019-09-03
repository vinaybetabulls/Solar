
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
AvailabilitySchema;

var timeSlots = new Schema({
slot: { type: String }
});
var AvailabilitySchema = new Schema({
contractor_id: Object,
created_on: { type: Date, default: Date.now },
start_slot: { type: String },
end_slot: { type: String },
time_slots: [timeSlots],
description: { type: String }
})


module.exports = mongoose.model('contractor-availablility', AvailabilitySchema);