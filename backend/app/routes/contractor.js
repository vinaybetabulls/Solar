var express = require('express'),
    router = express.Router(),
    moment = require('moment'),
    availabilityModal = require("../models/availabilityModal"),
    am = new availabilityModal();

router.post("/availability", function (req, res, next) {

    // {
    //     "contractor_id":"5d1350199880ff94115dedde",
    //     "start_slot":"10:00",
    //     "end_slot":"18:00"
    // }
    if (!req.body.contractor_id) {
        res.status(200).json({ status: '404', message: "Please provide contractor_id" });
    } else if (!req.body.start_slot) {
        res.status(200).json({ status: '404', message: "Please provide start_slot" });
    } else if (!req.body.end_slot) {
        res.status(200).json({ status: '404', message: "Please provide end_slot" });
    } else {
        intervals(req.body.start_slot, req.body.end_slot, function (intervals) {
            if (intervals) {
                req.body.time_slots = intervals;
                req.body.timeSlots = intervals;
                am.create(req, function (cdata) {
                    res.status(200).json(cdata);
                });
            } else {
                am.create(req, function (cdata) {
                    res.status(200).json(cdata);
                });
            }
        });
    }
})

function intervals(startString, endString, callabck) {
    var start, end, result = [], current;
    start = moment(startString, 'hh:mm a');
    end = moment(endString, 'hh:mm a');
    start.minutes(Math.ceil(start.minutes() / 15) * 15);
    result = [];
    current = moment(start);
    while (current <= end) {
        result.push({ slot: current.format('LT') });
        current.add(15, 'minutes');
    }
    callabck(result);
}

router.get("/availability/:contractor_id", function (req, res, next) {
    am.getAvailability(req, function (cdata) {
        res.status(200).json(cdata);
    });
})

router.post('/book-appointment', function (req, res) {
    // {
    //     "contractor_id":"5d1350199880ff94115dedde",
    //     "user_id":"5d11faffad5ae21a5c9770f1",
    //       "booking_slot_date": "26/6/2019",
    //     "booking_slot_time": "10:45AM"
    // }
    am.book(req, function (cdata) {
        res.status(200).json(cdata);
    });
})

module.exports = router;