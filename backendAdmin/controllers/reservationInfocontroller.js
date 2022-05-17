const ReservationInfo = require("../models/ReservationInfo");

//add new reservation Information
exports.addReservationInfo = async(req, res) => {

    //constant variables for the attributes
    const {roomNum, description, type, price, imgUrl} = req.body;

    //object
    const newReservationInfo = new ReservationInfo ({
       
        //initializing properties
        roomNum,
        description,
        type,
        price,
        imgUrl
    })

    //saving the object to the db
    newReservationInfo.save().then(() => {
        res.status(200).json({ status: "New Reservation Information Added" });
    }).catch((error) => {
        res.status(500).json({message:"Fail to Add Reservation Information",error:error.message});
    })
}

//delete existing reservation information
exports.deleteReservationInfo = async (req, res) => {
    let reservationId = req.params.id;

    await ReservationInfo.findByIdAndDelete(reservationId).then(() =>{
        res.status(200).json ({status: "Reservation Information Deleted."});
    }).catch((error) => {
        res.status(500).json({ status: "Error with Deleting Reservation Information", error: error.message });
    })
}

// update reservation information
exports.updateReservationInfo = async(req, res) =>{
    //fetch id from url
    let reservationId = req.params.id;

    const {roomNum, description,type, price, imgUrl} = req.body;

    const updateReservationInfo = {
        roomNum,
        description,
        type,
        price,
        imgUrl
    }

    //check whether there is a reservation information for the ID
    try{
        await ReservationInfo.findByIdAndUpdate(reservationId, updateReservationInfo);

        //sending the successful message
        res.status(200).json({ success: true, message: "Reservation Information Updated" })  
    }catch (error) {
        res.status(500).json({ message: "Error with Updating Reservation Information", error: error.message });
    }
}

//view Reservation Information
exports.viewAllReservationInfo = async(req,res) => {
    
    //calling reservation info model
    ReservationInfo.find().then((reservationInfo) =>{
        res.status(200).json(reservationInfo)
    }).catch((error) => {
        res.status(500).json({message: "Error with fetching Reservation Information", error: error.message });
    })
}

//view one Reservation Information
exports.viewOneReservationInfo = async (req, res) => {
    let reservationId = req.params.id;
  
    await ReservationInfo.findById(reservationId).then((reservationInfo) => {
      res.status(200).json({ status: "Reservation Information fetched", reservationInfo });
    }).catch((error) => {
      res.status(500).json({ status: "Error with fetching Reservation Information", error: error.message });
    })
}