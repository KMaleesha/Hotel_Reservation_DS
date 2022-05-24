const Taxi = require('../models/taxi');

//add taxibooking
exports.addTaxi = async(req,res) => {
    const {customerID,address,destination,date,passengerNo} = req.body;
    
    try { 

        //checking if taxi already booked on the date
        const checkTaxi = await Taxi.findOne({customerID,date})
        if(checkTaxi)
            return res.status(409).json({message: "Taxi is already booked on this date"})  

        //creating a new booking
        await Taxi.create({customerID,address,destination,date,passengerNo});
        //success message
        res.status(200).json({success: true,message:"Taxi Booking Added"})

    } catch (error) {
        //error message
        res.status(500).json({message: "Taxi Error", error: error.message})
    }
}