const mongoose=require('mongoose');

const Schema =mongoose.Schema;

const PaymentSchema=new Schema({
    
    customerID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'customer',
        required:true
    }, 
    roomID:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'reservationInfo',
       required:true
   },

   roomNum:{
       type:String,
       required:true
   },
    amount:{
        type:Number,
        required: false
    },
    email:{
        type:String,
        required: true

    },
    mobile:{
        type:Number,
        required: true
    },
    
    date:{
        type:String,
        required:false, 
    }

})

const Payment=mongoose.model("payment",PaymentSchema);
module.exports=Payment;