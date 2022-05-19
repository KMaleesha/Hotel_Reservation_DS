const router = require("express").Router();
const {addbooking, deletebooking, viewBooking, viewOneBooking} = require('../controllers/bookingcontroller.js')
const customerauth = require('../middleware/customerauth');

router.post('/add', addbooking);

router.delete('/delete/:id', customerauth, deletebooking);

router.get('/:id&:type', viewBooking);

router.get('/:id', viewOneBooking);

module.exports = router;