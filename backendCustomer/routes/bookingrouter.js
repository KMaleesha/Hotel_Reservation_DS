const router = require("express").Router();
const {addbooking, updatebooking, deletebooking, viewBooking, viewOneBooking} = require('../controllers/bookingcontroller.js')
// const customerauth = require('../middleware/customerauth');

router.post('/add', customerauth, addbooking);

router.delete('/delete/:id', customerauth, deletebooking);
// router.post('/add',customerauth, addbooking);

// router.put('/update/:id',customerauth, updatebooking);

// router.delete('/delete/:id',customerauth, deletebooking);

router.get('/:id&:type', viewBooking);

router.get('/:id', viewOneBooking);

module.exports = router;