const Payment = require("../models/payment");

//Add a Payment
exports.addPayment = async(req,res) => {
    const {customerID,roomID,roomNum,amount,email,mobile,date} = req.body;
   

    try {
        // //checking product already exists
        // const checkItem = await Submission.findOne({progressID,studentID})
        // if(checkItem)
        //     return res.status(409).json({message: "Submission already submitted"})
        //creating a new add submission
        await Payment.create({customerID,roomID,roomNum,amount,email,mobile,date});
        //success message
        res.status(200).json({success: true,message:"Payment added"})

    } catch (error) {
        //error message
        res.status(500).json({message: "can't added", error: error.message})
    }
}


// exports.addPayment = async (req, res) => {
 
//     //constant variables for the attributes
//     const {name, description, type, date,imgUrl} = req.body;
   
//     //object
//     const newPayment= new Payment({
//       //initializing properties
//       customerID,roomID,roomNum,amount,email,mobile,date
//     })
   
//     //saving the object to the db 
//     newPayment.save().then(() => {
//       res.status(200).json({ status: "New Payment Added" });
//     }).catch((error) => {
//       res.status(500).json({message:"Fail to Payment Item",error:error.message})
//     })
//   }
  