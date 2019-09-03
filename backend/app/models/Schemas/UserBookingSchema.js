
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    UserBookingSchema,
    ObjectId = Schema.ObjectId,
    UserBookingSchema = new Schema({
        contractor_id: { type: ObjectId },
        user_id: { type: ObjectId },
        booking_slot_date: String,
        booking_slot_time: String,
        created_on: { type: Date, default: Date.now },
    })


module.exports = mongoose.model('user-bookings', UserBookingSchema);