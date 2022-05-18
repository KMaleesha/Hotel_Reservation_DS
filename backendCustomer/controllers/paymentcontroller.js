const Payment = require("../models/payment");

//Add a payment
exports.addPayment = async(req,res) => {
    const{ customerID,roomID,amount,email,mobile,date } = req.body; 
  
    
    try{
        //creating a new payment
        const payment = await Payment.create({customerID,roomID, amount, email,mobile,date});

        
        res.status(200).json ({success:true,message:"payment added",payment})
     }catch(error){
         res.status(500).json({message: "unable to add the payment",error:error.message});
     }
}

//update payment details
exports.updatePayment = async(req,res)=>{
    let paymentID=req.params.id;
    const{ amount, creditCardNumber} =req.body;
    const updatePayment={ amount, creditCardNumber, date}

    try{
        //find review by patient ID
        await Payment.findByIdAndUpdate(paymentID,updatePayment);

        res.status(200).json({message: "payment updated"})
    }catch(error){
        res.status(500).json({message:"Error with updating the payment details",error:error.message});

    }
 }

//delete payment details
exports.deletePayment= async(req,res)=>{

    let paymentID =req.params.id;

    try{
        await Payment.findByIdAndDelete(paymentID);

        res.status(200).json({message:"delete successful"});
    }catch(error){
        res.status(500).json({message:"delete unsuccessful",error:error.message});
    }
}
//fetching all payments
exports.fetchAll = async(req,res)=>{
    Payment.find().populate({path:'customerID',select:['firstname','lastname']}).then((payments)=>{

        res.status(200).json(payments)
    }).catch((error)=>{
        res.status(500).json({message:"fetching failed",error:error.message});
    })

}
//view payments
exports.viewPayments = async(req,res) => {
    //get patient id
    let patientID = req.params.id;
    try {
        //view payments
        const payments = await Payment.find({customerID}).populate({path:'patientID',select:['firstname','lastname']});
        //success message
        res.status(200).json({success: true,result:payments})
    }catch(error){
        //error message
        res.status(500).json({message: "Error with fetching payments", error: error.message})
    }
}

exports.fetchOne = async(req,res)=>{
    let paymentID =req.params.id;

    await Payment.findById(paymentID).populate({path:'customerID',select:['firstname','lastname']})
    .then((payment)=>{
        res.status(200).json(payment)

    }).catch((error)=>{
        res.status(500).json({message:"fetching failed",error:error.message});
    })
}