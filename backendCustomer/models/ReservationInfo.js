const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReservationInfoSchema = new Schema({
    roomNum: {
        type: String,
        required : true
    },
    description : {
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
    },
    imgUrl: {
        type: String,
        required: false
    },
})

const ReservationInfo = mongoose.model("reservationinfo", ReservationInfoSchema)
module.exports = ReservationInfo