const router = require("express").Router();
const { adminSignin, adminSignup } = require('../controllers/admincontroller.js');

//admin sign up
router.post('/signup', adminSignup);

//admin sign in
router.post('/signin', adminSignin);

module.exports = router;