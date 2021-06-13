const express = require('express');
const router = express.Router();
const multer = require("../../utils/multerUtil");
const { verifiedUid } = require('../../middleware/verifiedUid');


const { createTripRoom, fetchTrips, fetchTrip, updateBalance, fetchBooked, commenting, likeTrip } = require("../../controller/trip");

router.route('/createTripRoom').post(verifiedUid, createTripRoom);
router.route('/fetchTrips').post(verifiedUid, fetchTrips);
router.route('/fetchTrip').post(verifiedUid, fetchTrip);
router.route('/fetchBooked').post(verifiedUid, fetchBooked);
router.route('/updateBalance').post(verifiedUid, updateBalance);
router.route('/commenting').post(verifiedUid, commenting);
router.route('/likeTrip').post(verifiedUid, likeTrip);

module.exports = router;
