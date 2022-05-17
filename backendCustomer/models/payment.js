const mongoose=require('mongoose');

const Schema =mongoose.Schema;

const PaymentSchema=new Schema({
    
    customerID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'patient',
        required:true
    }, 
   roomID:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'product',
       required:true
   },
    amount:{
        type:Number,
        required: true
    },
    
    date:{
        type:String,
        required:true, 
    }

})

const Payment=mongoose.model("payment",PaymentSchema);
module.exports=Payment;