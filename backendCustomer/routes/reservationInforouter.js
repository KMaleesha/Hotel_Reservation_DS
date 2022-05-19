const router = require('express').Router();
const {viewAllReservationInfo, viewOneReservationInfo} = require('../controllers/reservationInfocontroller.js')

//view Reservation Information
router.get('/', viewAllReservationInfo);

//view one Reservation Information
router.get('/:id',viewOneReservationInfo);

module.exports = router;