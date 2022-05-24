const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaxiSchema = new Schema({
 
    customerID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'customer',
        required : true
    },

    address : {
        type : String,
        required : true
    },

    destination : {
        type : String,
        required : true
    },

    date : {
        type : String,
        required : true
    },

    passengerNo : {
        type : Number,
        required : true
    },


})

const Taxi = mongoose.model("taxi",TaxiSchema)
module.exports = Taxi