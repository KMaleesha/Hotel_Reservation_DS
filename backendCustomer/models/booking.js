const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    roomID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'reservationinfos',
        required : true

    },
    
    customerID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'customer',
        required : true
    },

    date : {
        type : String,
        required : true
    },

    type : {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true
    }

})

const Booking = mongoose.model("booking",BookingSchema)
module.exports = Booking