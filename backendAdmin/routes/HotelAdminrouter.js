const router = require("express").Router();
const { signinHotelAdmin, signupHotelAdmin } = require('../controllers/HotelAdmincontroller.js');

//HotelAdmin sign up
router.post('/signup', signupHotelAdmin);

//HotelAdmin sign in
router.post('/signin', signinHotelAdmin);

module.exports = router;