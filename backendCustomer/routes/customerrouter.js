const router = require("express").Router();
const { customerSignup, customerSignin} = require('../controllers/customercontroller.js');

//customer sign up
router.post('/signup', customerSignup);

//customer sign in
router.post('/signin', customerSignin);


module.exports = router;