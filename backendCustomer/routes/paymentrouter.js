const router=require("express").Router();
const{ addPayment  }=require('../controllers/paymentcontroller.js');


router.post('/add', addPayment);



module.exports =router;