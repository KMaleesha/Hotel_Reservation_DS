const ReservationInfo = require("../models/ReservationInfo");

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