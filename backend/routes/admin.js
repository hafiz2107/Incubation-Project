const express = require('express')
const adminControllers = require('../controllers/adminControllers')

const router = express.Router()

router.route('/fetchapps').get(adminControllers.fetchApps )

router.route('/viewapplication/:appId').get(adminControllers.fetchSingleApplication)

router.route('/acceptapplication/:appId').patch(adminControllers.acceptApplication)

router.route('/rejectapplication/:appId').patch(adminControllers.rejectApplication)

router.route('/fetchpendingapplications').get(adminControllers.fetchPendingApps)

router.route('/addseat').post(adminControllers.addSeats)

router.route('/fetchseats').get(adminControllers.fetchSeats)
module.exports = router