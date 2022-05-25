//twilio
const express=require("express");
const router = express.Router();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);


//send sms
router.post('/', (req,res) => {
    const { paymentID,amount,roomID,date,mobile,email} = req.body; 
   
    client.messages
    .create({
        //get the details
        body: "Payment Successful",
        //sms send number
        from: '(470) 536-4390 ',

        to: '0770208268'
    })
    .then(message =>{
        console.log(message.status);
        res.send(message.status);
    })
    .done();
});  

//Vonage

// const router=require("express").Router();
// const Vonage = require('@vonage/server-sdk')

// const vonage = new Vonage({
//   apiKey: 'process.env.apiKey',
//   apiSecret: 'process.env.apiSecret'
// })

// const from = "Vonage APIs"
// const to = "94770208268"
// const text = 'A text message sent using the Vonage SMS API'

// vonage.message.sendSms(from, to, text, (err, responseData) => {
//     if (err) {
//         console.log(err);
//     } else {
//         if(responseData.messages[0]['status'] === "0") {
//             console.log("Message sent successfully.");
//         } else {
//             console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
//         }
//     }
// })



module.exports = router;