
var AvailabilitySchema = require('./Schemas/ConAvailabilitySchema'),
    moment = require('moment'),
    UserBookingsSchema = require('./Schemas/UserBookingSchema');


function AvailabilityModel() {
    this.availability = AvailabilitySchema;
    this.userBookings = UserBookingsSchema;
}

AvailabilityModel.prototype.create = function (req, callback) {
    let _self = this;
    _self.getAvailability({ contractor_id: req.body.contractor_id }, function (res) {
        if (!res.response.length) {
            _self.availability.create(req.body, function (err, data) {
                if (err) {
                    callback({ status: '400', message: "Something went wrong", err: err })
                } else {
                    callback({ status: '200', message: "Succesfully added available time slots", response: data })
                }
            });
        } else {
            _self.availability.update(req.body, function (err, data) {
                if (err) {
                    callback({ status: '400', message: "Something went wrong" })
                } else {
                    callback({ status: '200', message: " Time Slots Succesfully Updated ", response: data })
                }
            });
        }
    })
};

AvailabilityModel.prototype.getAvailability = function (req, callback) {
    var user_id;
    if (req.params && req.params.contractor_id) {
        user_id = req.params.contractor_id
    } else if (req.contractor_id) {
        user_id = req.contractor_id
    }
    this.availability.findOne({ contractor_id: user_id }, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else if (data) {
            data.end_slot = moment(data.end_slot, 'hh:mm a').format('LT');
            data.start_slot = moment(data.start_slot, 'hh:mm a').format('LT');
            callback({ status: '200', message: "Success", response: data })
        } else {
            callback({ status: '400', message: "No Data Found", response: data })
        }
    });
};

AvailabilityModel.prototype.book = function (req, callback) {
    this.userBookings.create(req.body, function (err, data) {
        if (err) {
            callback({ status: '400', message: "Something went wrong" })
        } else {
            callback({ status: '200', message: "Success", response: data })
        }
    });
};

module.exports = AvailabilityModel;