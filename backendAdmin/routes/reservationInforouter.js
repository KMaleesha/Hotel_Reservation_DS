const router = require('express').Router();
const { addReservationInfo, deleteReservationInfo, updateReservationInfo, viewAllReservationInfo, viewOneReservationInfo} = require('../controllers/reservationInfocontroller.js')

//add new reservation Information
router.post('/add', addReservationInfo);

//delete existing reservation information
router.delete('/delete/:id', deleteReservationInfo);

// update reservation information
router.put('/update/:id', updateReservationInfo);

//view Reservation Information
router.get('/', viewAllReservationInfo);

//view one Reservation Information
router.get('/item/:id',viewOneReservationInfo);

module.exports = router;