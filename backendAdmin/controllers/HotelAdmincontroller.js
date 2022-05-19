const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HotelAdmin = require('../models/HotelAdmin');

//HotelAdmin sign in () 
exports.signinHotelAdmin = async(req,res) => {
    const{ slmcreg, password } = req.body;

        try{
            //find the HotelAdmin by SLMC registration number
            const hotelAdmin = await HotelAdmin.findOne({slmcreg}).select("+password");

            //if the SLMC registration doesn't exist
            if (!hotelAdmin)
                return res.status(404).json({message: "Such SLMC registration number doesn't exist"});

            //compare the password with provided password
            const ispasswordMatch = await bcrypt.compare(password, hotelAdmin.password);

            //if passwords didn't match
            if(!ispasswordMatch)
                return res.status(400).json({message: "Invalid Password"});

            //creating a token
            const token = jwt.sign({slmcreg: hotelAdmin.slmcreg, id: hotelAdmin._id}, process.env.JWT_SECRET, {expiresIn:"1h"} )

            //joining the hotelAdmin object and token
            res.status(200).json({result: hotelAdmin, token})
        }catch(error){
            res.status(500).json({message: "Something went wrong", error: error.message})
        }
}


//hotelAdmin signup
exports.signupHotelAdmin = async(req,res) => {

    const {firstname, lastname, email, gender, nic, phone, address, password, imgUrl} = req.body;
    const dob = new Date(req.body.dob)


    try {
        //checking email already exists
        const checkEmail = await HotelAdmin.findOne({email})
        const checkNIC = await HotelAdmin.findOne({nic})

        if(checkEmail)
            return res.status(409).json({message: "User with this email already exists"})
        
        if(checkNIC)
            return res.status(409).json({message: "User with this NIC already exists"})

        //creating a new HotelAdmin
        const hotelAdmin = await HotelAdmin.create({firstname, lastname, email, dob, gender, nic, phone, address, password, imgUrl});

        //creating a token
        const token = jwt.sign({email: hotelAdmin.email, id: hotelAdmin._id}, process.env.JWT_SECRET, {expiresIn: "1h"})

        //sending the hotelAdmin object and token as the response
        res.status(200).json({success: true, result: hotelAdmin, token})
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message})
    }
}
