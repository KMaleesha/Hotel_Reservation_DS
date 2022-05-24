const router = require('express').Router();
const {addTaxi} = require('../controllers/taxicontroller.js')

//add taxi order
router.post('/add', addTaxi);

module.exports = router;