const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationInfoSchema = new Schema({
    name: {
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
    }
})

const reservationInfo = mongoose.model("reservationInfo", ReadableStream)
module.exports = reservationInfo