const Booking = require('../models/booking');


//add booking
exports.addbooking = async(req,res) => {
    const {roomID,customerID,date,type,price} = req.body;

    try {
        //checking if room already booked
        const checkRoom = await Booking.findOne({roomID,date})
        if(checkRoom)
            return res.status(409).json({message: "Room is already booked on this date"})

        //creating a new booking
        await Booking.create({roomID,customerID,date,type,price});
        //success message
        res.status(200).json({success: true,message:"Booking Added"})

    } catch (error) {
        //error message
        res.status(500).json({message: "Booking Error", error: error.message})
    }
}

//update booking
// exports.updateitem = async(req,res) => {
//     //get booking id
//     let cartId = req.params.id;

//     const date = Number(req.body.date);
//     const Price = Number(req.body.price);

//     let price = Price * date;

//     const updateCart = {date,price}
    
//     try {
//         //find a booking by ID for update
//         await Booking.findByIdAndUpdate(cartId,updateCart);
//         //success message
//         res.status(200).json({success: true,message:"Quantity updated"})

//     }catch(error){
//         //error message
//         res.status(500).json({message: "failed to update", error: error.message})
//     }
// }

//delete booking
exports.deletebooking = async(req,res) => {
    let bookingId = req.params.id;

    try {
        //find a booking by ID for delete
        await Booking.findByIdAndDelete(bookingId);
        //success message
        res.status(200).json({success: true,message:"Booking Deleted"})

    }catch(error){
        //error message
        res.status(500).json({message: "Can't Delete Booking", error: error.message})
    }
}

//view booking
exports.viewBooking = async(req,res) => {
    //get customer id
    let customerID = req.params.id;
    //get booking type( Shopping or prescription )
    let type = req.params.type;

    try {
        //find booking by customer id and booking id
        const booking = await Booking.find({customerID,type}).populate(
            {path:'roomID', select:['roomNum','price','description','imgUrl']});
        //success message
        res.status(200).json({success: true,result:booking})
    }catch(error){
        //error message
        res.status(500).json({message: "Error with fetching bookings", error: error.message})
    }
}

//view one booking
exports.viewOneBooking = async(req,res) => {
    //get booking id
    let bookingID = req.params.id;

    try {
        //find booking by patient id and booking
        const booking = await Booking.findById(bookingID)            
        //success message
        res.status(200).json({success: true,result:booking})
    }catch(error){
        //error message
        res.status(500).json({message: "Error with fetching booking", error: error.message})
    }
}

