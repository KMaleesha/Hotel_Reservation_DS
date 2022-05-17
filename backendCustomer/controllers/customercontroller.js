const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Customer = require('../models/Customer');
const sendEmail = require("../utils/sendEmail")

//Customer sign in controller
exports.customerSignin = async(req, res) => {
    const {email, password} = req.body;

    // Check if email and password is provided
    if (!email || !password)
        return res.status(400).json({message: "Please provide an email and password" });

    try{
        //finding customer by email
        const customer = await Customer.findOne({email}).select("+password");
        
        //if customer doesn't exist
        if (!customer) 
            return res.status(404).json({message: "User doesn't exist"});

        //compare the provided password with the password in the database
        const ispasswordCorrect = await bcrypt.compare(password, customer.password);

        //if passwords don't match
        if (!ispasswordCorrect)
            return res.status(400).json({message: "Invalid credentials"});

        //creating a token
        const token = jwt.sign({email: customer.email, id: customer._id}, process.env.JWT_SECRET, {expiresIn: "1h"})

        //sending the customer object and token as the response
        res.status(200).json({success: true, result: customer, token})
    }catch(error){
        res.status(500).json({message: "Something went wrong", error: error.message})
    }
}

//customer sign up controller
exports.customerSignup = async(req,res) => {
    const {firstname, lastname, email, gender, nic, phone, address, password, imgUrl} = req.body;
    const dob = new Date(req.body.dob)


    try {
        //checking email already exists
        const checkEmail = await Customer.findOne({email})
        const checkNIC = await Customer.findOne({nic})

        if(checkEmail)
            return res.status(409).json({message: "User with this email already exists"})
        
        if(checkNIC)
            return res.status(409).json({message: "User with this NIC already exists"})

        //creating a new customer
        const customer = await Customer.create({firstname, lastname, email, dob, gender, nic, phone, address, password, imgUrl});

        //creating a token
        const token = jwt.sign({email: customer.email, id: customer._id}, process.env.JWT_SECRET, {expiresIn: "1h"})

        //sending the customer object and token as the response
        res.status(200).json({success: true, result: customer, token})
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message})
    }
}
