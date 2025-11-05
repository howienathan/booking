const Booking = require("../models/bookingModels")

const getBookings = async(req, res, next) => {
    try { 
 const booking = await Booking.find();
 if(!booking) {
    res.status(400);
    throw new Error ("cant get booking");
 }

 return res.status(201).json(booking);
} catch(error) {
    next(error)
}

};

//create booking
const createBooking = async(req, res, next) => {
   
try { 
 const booking = await Booking.create(req.body);
 if(!booking) {
    res.status(400);
    throw new Error ("cant make booking");
 }

 return res.status(201).json(booking);
} catch(error) {
    next(error);
}
};

//update booking 
const updateBooking = async(req, res, next) => {
    try { 
 const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, {
    $set: req.body
 }, {
    new: true
 });
 if(!updatedBooking) {
    res.status(400);
    throw new Error ("cant update booking");
 }
 const bookings = await Booking.find();
 return res.status(201).json(bookings);
} catch(error) {
    next(error);
}

};
//delete booking 
const deleteBooking = async(req, res, next) => {
    try { 
 const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
 if(!deletedBooking) {
    res.status(400);
    throw new Error ("cant delete booking");
 }

 return res.status(201).json({ id: req.params.id });
} catch(error) {
    next(error);
}

}

module.exports = {
    getBookings,
    createBooking,
    updateBooking,
    deleteBooking,
}