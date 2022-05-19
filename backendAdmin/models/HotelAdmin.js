const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const HotelAdminSchema = new Schema({
    firstname: {
        type: String,
        require: true
    },

    lastname: {
        type: String,
        require: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },

    dob: {
        type: Date,
        required: true
    },

    gender: {
        type: String,
        required: true,
    },

    nic: {
        type: String,
        required: true,
        unique: true,
        match: /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/
    },

    phone: {
        type: String,
        required: true,
        match: /^(?:7|0|(?:\+94))[0-9]{9,10}$/
    },

    address: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        //select set to false so password doesn't come when querying automatically
        select: false
    },

    imgUrl: {
        type: String,
        required: false
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

//this function run before saving data to database
HotelAdminSchema.pre("save", async function(next){

    //hashing the password
    //checking if the password is already hashed
    if (!this.isModified("password")){
        next();
    }

    //hashing the with difficulty level 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

 

const HotelAdmin = mongoose.model("hotelAdmin",HotelAdminSchema)
module.exports = HotelAdmin